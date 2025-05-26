"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Building, Wallet, Shield, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CheckoutPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "Username", // Prefilled as if user is logged in
    email: "user@example.com", // Prefilled as if user is logged in
    paymentMethod: "credit-card",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaymentMethodChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would process the payment
    // For now, we'll just show a success message
    alert("Pembayaran berhasil! (Simulasi)")
    router.push("/")
  }

  // Tournament details (dummy data)
  const tournament = {
    id: "t123",
    name: "MLBB Championship Series",
    date: "15 Juni 2023",
    location: "Jakarta Convention Center",
    ticketPrice: 150000,
    ticketType: "Regular Pass",
    image: "/placeholder.svg?height=200&width=400&text=MLBB+Championship",
  }

  // Calculate totals
  const subtotal = tournament.ticketPrice
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">Checkout Tiket Turnamen</h1>
          <p className="text-muted-foreground">Selesaikan pembelian tiket Anda</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main checkout form - 2/3 width on desktop */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-600" />
                  Detail Turnamen
                </CardTitle>
                <CardDescription>Informasi turnamen yang Anda pilih</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <img
                      src={tournament.image || "/placeholder.svg"}
                      alt={tournament.name}
                      className="rounded-md w-full h-auto object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-2">
                    <h3 className="text-lg font-bold">{tournament.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tanggal</p>
                        <p>{tournament.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lokasi</p>
                        <p>{tournament.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Jenis Tiket</p>
                        <p>{tournament.ticketType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Harga</p>
                        <p className="font-medium">Rp {tournament.ticketPrice.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Pembeli</CardTitle>
                <CardDescription>Masukkan data diri Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
                <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="cards">Kartu</TabsTrigger>
                    <TabsTrigger value="bank">Transfer Bank</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="pt-4">
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex flex-1 items-center cursor-pointer">
                          <CreditCard className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Kartu Kredit/Debit</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer" className="flex flex-1 items-center cursor-pointer">
                          <Building className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Transfer Bank</p>
                            <p className="text-sm text-muted-foreground">BCA, Mandiri, BNI, BRI</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="e-wallet" id="e-wallet" />
                        <Label htmlFor="e-wallet" className="flex flex-1 items-center cursor-pointer">
                          <Wallet className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">E-Wallet</p>
                            <p className="text-sm text-muted-foreground">GoPay, OVO, DANA, LinkAja</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="cards" className="pt-4">
                    <RadioGroup
                      value={formData.paymentMethod === "credit-card" ? "credit-card" : ""}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="credit-card" id="credit-card-tab" />
                        <Label htmlFor="credit-card-tab" className="flex flex-1 items-center cursor-pointer">
                          <CreditCard className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Kartu Kredit/Debit</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="bank" className="pt-4">
                    <RadioGroup
                      value={formData.paymentMethod === "bank-transfer" ? "bank-transfer" : ""}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer-tab" />
                        <Label htmlFor="bank-transfer-tab" className="flex flex-1 items-center cursor-pointer">
                          <Building className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Transfer Bank</p>
                            <p className="text-sm text-muted-foreground">BCA, Mandiri, BNI, BRI</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order summary - 1/3 width on desktop */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                  <CardDescription>Detail pembayaran Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pajak (10%)</span>
                      <span>Rp {tax.toLocaleString("id-ID")}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                    <div className="flex">
                      <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p>Pembayaran Anda aman dan terenkripsi</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={handleSubmit}>
                    Bayar Sekarang
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  <span>Jaminan tiket resmi</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  <span>Pembayaran aman & terpercaya</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  <span>Dukungan pelanggan 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
