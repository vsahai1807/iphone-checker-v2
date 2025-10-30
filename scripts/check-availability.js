import fetch from "node-fetch"

const CONFIG = {
  apiEndpoint: "https://www.apple.com/shop/retail/pickup-message",
  zipCode: process.env.ZIP_CODE || "07029",
  notificationWebhook: process.env.NOTIFICATION_WEBHOOK,

  // Multiple iPhone configurations
  // Expected format: [{"name": "Deep Blue", "model": "MODEL1"}, {"name": "Cosmic Orange", "model": "MODEL2"}]
  iphoneConfigs: process.env.IPHONE_CONFIGS
    ? JSON.parse(process.env.IPHONE_CONFIGS)
    : [
        {
          name: "Deep Blue 256GB",
          model: "MU773LL/A", // Placeholder - update when iPhone 17 launches
          color: "Deep Blue",
          storage: "256GB",
        },
        {
          name: "Cosmic Orange 256GB",
          model: "MU774LL/A", // Placeholder - update when iPhone 17 launches
          color: "Cosmic Orange",
          storage: "256GB",
        },
      ],
}

/**
 * Fetches iPhone availability from Apple's API for a specific model
 */
async function checkAvailability(productModel) {
  try {
    console.log(`Checking availability for ${productModel} near ${CONFIG.zipCode}...`)

    const url = `${CONFIG.apiEndpoint}?pl=true&parts.0=${productModel}&location=${CONFIG.zipCode}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return parseAvailabilityData(data, productModel)
  } catch (error) {
    console.error(`Error checking availability for ${productModel}:`, error)
    throw error
  }
}

/**
 * Parses the availability data from Apple's API response
 */
function parseAvailabilityData(data, productModel) {
  const stores = []
  const body = data.body || {}
  const storesData = body.stores || []

  for (const store of storesData) {
    const storeInfo = {
      name: store.storeName,
      city: store.city,
      state: store.state,
      address: store.address?.address,
      distance: store.storedistance,
      available: false,
      pickupDisplay: "Unavailable",
    }

    // Check product availability at this store
    const partsAvailability = store.partsAvailability || {}
    const productAvailability = partsAvailability[productModel]

    if (productAvailability) {
      storeInfo.available = productAvailability.pickupDisplay !== "unavailable"
      storeInfo.pickupDisplay = productAvailability.pickupDisplay
      storeInfo.pickupSearchQuote = productAvailability.pickupSearchQuote
    }

    stores.push(storeInfo)
  }

  return stores
}

/**
 * Formats availability results for a specific iPhone configuration
 */
function formatResults(config, stores) {
  const availableStores = stores.filter((s) => s.available)
  const unavailableStores = stores.filter((s) => !s.available)

  let message = `📱 iPhone 17 Pro Max - ${config.name}\n`
  message += `Color: ${config.color}\n`
  message += `Storage: ${config.storage}\n`
  message += `Model: ${config.model}\n`
  message += `Location: ${CONFIG.zipCode}\n`
  message += `Time: ${new Date().toLocaleString()}\n`
  message += `${"=".repeat(50)}\n\n`

  if (availableStores.length > 0) {
    message += `✅ AVAILABLE (${availableStores.length} stores):\n`
    availableStores.forEach((store) => {
      message += `  • ${store.name} - ${store.city}, ${store.state}\n`
      message += `    ${store.pickupSearchQuote || store.pickupDisplay}\n`
      if (store.distance) message += `    Distance: ${store.distance} miles\n`
    })
    message += "\n"
  }

  if (unavailableStores.length > 0) {
    message += `❌ UNAVAILABLE (${unavailableStores.length} stores):\n`
    unavailableStores.forEach((store) => {
      message += `  • ${store.name} - ${store.city}, ${store.state}\n`
    })
  }

  return { message, hasAvailability: availableStores.length > 0 }
}

/**
 * Sends notification via webhook
 */
async function sendNotification(message) {
  if (!CONFIG.notificationWebhook) {
    console.log("No notification webhook configured. Skipping notification.")
    return
  }

  try {
    // Discord webhook format
    const payload = {
      content: message,
      username: "iPhone Availability Bot",
    }

    const response = await fetch(CONFIG.notificationWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status}`)
    }

    console.log("Notification sent successfully")
  } catch (error) {
    console.error("Error sending notification:", error)
  }
}

async function main() {
  try {
    console.log(`Checking availability for ${CONFIG.iphoneConfigs.length} iPhone configurations...\n`)

    // Check each iPhone configuration separately
    for (const config of CONFIG.iphoneConfigs) {
      console.log(`\n${"=".repeat(60)}`)
      console.log(`Checking: ${config.name}`)
      console.log(`${"=".repeat(60)}`)

      try {
        const stores = await checkAvailability(config.model)
        const { message, hasAvailability } = formatResults(config, stores)

        console.log("\n" + message)

        await sendNotification(message)

        if (hasAvailability) {
          console.log(`✅ Availability found for ${config.name}. Notification sent.`)
        } else {
          console.log(`ℹ️ No availability for ${config.name}. Status notification sent.`)
        }
      } catch (error) {
        console.error(`Error checking ${config.name}:`, error)
        const errorMessage = `⚠️ Error checking ${config.name}\nModel: ${config.model}\nError: ${error.message}\nTime: ${new Date().toLocaleString()}`
        await sendNotification(errorMessage)
      }

      // Add a small delay between requests to avoid rate limiting
      if (CONFIG.iphoneConfigs.indexOf(config) < CONFIG.iphoneConfigs.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    console.log(`\n${"=".repeat(60)}`)
    console.log("Availability check complete for all configurations")
    console.log(`${"=".repeat(60)}`)
  } catch (error) {
    console.error("Fatal error:", error)
    process.exit(1)
  }
}

main()
