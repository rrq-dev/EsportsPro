// This is a dummy payment service for simulation purposes
export const paymentService = {
  // Process payment
  processPayment: async (paymentData) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate payment processing
    // In a real app, this would call a payment gateway API
    const isSuccessful = Math.random() > 0.1 // 90% success rate for demo

    if (!isSuccessful) {
      throw new Error("Payment processing failed. Please try again.")
    }

    // Generate a transaction ID
    const transactionId = `txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    return {
      transactionId,
      amount: paymentData.amount,
      status: "completed",
      timestamp: new Date().toISOString(),
      paymentMethod: paymentData.paymentMethod,
    }
  },

  // Validate payment details (basic validation)
  validatePaymentDetails: (details) => {
    const errors = {}

    // Card number validation (simple check for demo)
    if (!details.cardNumber || details.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Please enter a valid 16-digit card number"
    }

    // Expiry validation
    if (!details.expiry || !/^\d{2}\/\d{2}$/.test(details.expiry)) {
      errors.expiry = "Please enter a valid expiry date (MM/YY)"
    } else {
      const [month, year] = details.expiry.split("/")
      const now = new Date()
      const currentYear = now.getFullYear() % 100
      const currentMonth = now.getMonth() + 1

      if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        errors.expiry = "Card has expired"
      }
    }

    // CVV validation
    if (!details.cvv || !/^\d{3,4}$/.test(details.cvv)) {
      errors.cvv = "Please enter a valid CVV code"
    }

    // Name validation
    if (!details.cardholderName || details.cardholderName.trim().length < 3) {
      errors.cardholderName = "Please enter the cardholder name"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  },
}
