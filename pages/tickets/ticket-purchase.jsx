"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { paymentService } from "../../services/payment-service"
import { useAuth } from "../../contexts/auth-context"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Separator } from "../../components/ui/separator"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { ArrowLeft, Calendar, CreditCard, MapPin } from "lucide-react"

export function TicketPurchase() {
  const { tournamentId } = useParams()
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()

  // Ticket price (in a real app, this would come from the API)
  const ticketPrice = 49.99

  useEffect(() => {
    fetchTournament()
  }, [tournamentId])

  const fetchTournament = async () => {
    try {
      setLoading(true)
      const data = await apiService.getTournamentById(tournamentId)
      setTournament(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tournament details. Please try again.",
      })
      navigate("/tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (value) => {
    setTicketQuantity(Number.parseInt(value))
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()

      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }))
      return
    }

    // Format expiry date
    if (name === "expiry") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5)

      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }))
      return
    }

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateTotal = () => {
    const subtotal = ticketPrice * ticketQuantity
    const fees = subtotal * 0.05 // 5% service fee
    return {
      subtotal: subtotal.toFixed(2),
      fees: fees.toFixed(2),
      total: (subtotal + fees).toFixed(2),
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate payment details
    const validation = paymentService.validatePaymentDetails(paymentDetails)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    // Clear any previous errors
    setErrors({})

    try {
      setProcessing(true)

      // Process payment
      const paymentResult = await paymentService.processPayment({
        amount: calculateTotal().total,
        paymentMethod: "credit_card",
        ...paymentDetails,
      })

      // Create order
      const order = {
        id: `order-${Date.now()}`,
        user_id: user.id,
        tournament_id: tournamentId,
        quantity: ticketQuantity,
        total_amount: calculateTotal().total,
        payment_id: paymentResult.transactionId,
        status: "completed",
        created_at: new Date().toISOString(),
      }

      // Save order
      const savedOrder = await apiService.createOrder(order)

      toast({
        title: "Success",
        description: "Your ticket purchase was successful!",
      })

      // Navigate to confirmation page
      navigate(`/tickets/confirmation/${savedOrder.id}`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
      })
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Tournament not found</h2>
        <Button className="mt-4" onClick={() => navigate("/tickets")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>
      </div>
    )
  }

  const { subtotal, fees, total } = calculateTotal()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/tickets")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Purchase Tickets</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{tournament.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {tournament.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Event Date</p>
                  <p>
                    {new Date(tournament.start_date).toLocaleDateString()} -{" "}
                    {new Date(tournament.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Number of Tickets</Label>
                <Select value={ticketQuantity.toString()} onValueChange={handleQuantityChange}>
                  <SelectTrigger id="quantity">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "ticket" : "tickets"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Tickets ({ticketQuantity} x ${ticketPrice})
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${fees}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Enter your payment details to complete the purchase</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  value={paymentDetails.cardholderName}
                  onChange={handlePaymentDetailsChange}
                  placeholder="Name on card"
                  required
                />
                {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    value={paymentDetails.expiry}
                    onChange={handlePaymentDetailsChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                  {errors.expiry && <p className="text-sm text-destructive">{errors.expiry}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentDetailsChange}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                  {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  `Pay $${total}`
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
