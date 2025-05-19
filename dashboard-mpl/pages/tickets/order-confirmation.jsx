"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { ArrowLeft, Calendar, Check, Download, MapPin, Ticket } from "lucide-react"

export function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const orderData = await apiService.getOrderById(orderId)
      setOrder(orderData)

      // Fetch tournament details
      const tournamentData = await apiService.getTournamentById(orderData.tournament_id)
      setTournament(tournamentData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load order details. Please try again.",
      })
      navigate("/tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTickets = () => {
    // In a real app, this would generate and download ticket PDFs
    toast({
      title: "Tickets Downloaded",
      description: "Your tickets have been downloaded successfully.",
    })
  }

  if (loading) {
    return <Loading />
  }

  if (!order || !tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Button className="mt-4" onClick={() => navigate("/tickets")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/tickets")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Order Confirmation</h1>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Payment Successful!</h2>
            <p className="text-green-700">Your order has been confirmed and your tickets are ready.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment ID</span>
              <span>{order.payment_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span>{order.quantity} tickets</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-bold">${order.total_amount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{tournament.name}</h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="mr-1 h-4 w-4" /> {tournament.location}
              </div>
            </div>

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

            <div className="flex items-center">
              <Ticket className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ticket Type</p>
                <p>General Admission</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleDownloadTickets}>
              <Download className="mr-2 h-4 w-4" /> Download Tickets
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => navigate("/orders")}>
          View Order History
        </Button>
        <Button onClick={() => navigate("/tickets")}>Browse More Events</Button>
      </div>
    </div>
  )
}
