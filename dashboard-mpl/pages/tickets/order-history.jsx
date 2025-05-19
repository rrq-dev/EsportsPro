"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { useAuth } from "../../contexts/auth-context"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { Download, Eye } from "lucide-react"

export function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [tournaments, setTournaments] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)

      // Fetch user's orders
      const ordersData = await apiService.getUserOrders(user.id)
      setOrders(ordersData)

      // Fetch tournament details for each order
      const tournamentIds = [...new Set(ordersData.map((order) => order.tournament_id))]
      const tournamentsData = {}

      await Promise.all(
        tournamentIds.map(async (id) => {
          const tournament = await apiService.getTournamentById(id)
          tournamentsData[id] = tournament
        }),
      )

      setTournaments(tournamentsData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load order history. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTickets = (orderId) => {
    // In a real app, this would generate and download ticket PDFs
    toast({
      title: "Tickets Downloaded",
      description: "Your tickets have been downloaded successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order History</h1>
        <Button onClick={() => navigate("/tickets")}>Browse Tickets</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loading />
          ) : (
            <>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold">No orders found</h2>
                  <p className="text-muted-foreground mt-2">You haven't purchased any tickets yet.</p>
                  <Button className="mt-4" onClick={() => navigate("/tickets")}>
                    Browse Available Tickets
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const tournament = tournaments[order.tournament_id]

                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{tournament?.name || order.tournament_id}</TableCell>
                          <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>${order.total_amount}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === "completed" ? "default" : "outline"}>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/tickets/confirmation/${order.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDownloadTickets(order.id)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
