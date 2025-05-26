"use client"

import { useState } from "react"
import { Trophy, Users, User, ListChecks, ChevronRight, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-4">
          <h1 className="text-xl font-semibold">Dashboard Pengguna</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <section className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Selamat datang, Pemain!</h2>
              <p className="text-muted-foreground">Lihat ringkasan aktivitas turnamen dan tim Anda di sini.</p>
            </div>
            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                <TabsTrigger value="teams">Tim</TabsTrigger>
                <TabsTrigger value="players">Pemain</TabsTrigger>
                <TabsTrigger value="tournaments">Turnamen</TabsTrigger>
                <TabsTrigger value="scores">Skor</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tim Saya</CardTitle>
                      <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">Tim aktif yang Anda ikuti</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Profil Pemain</CardTitle>
                      <User className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Lengkap</div>
                      <p className="text-xs text-muted-foreground">Status profil Anda</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Turnamen</CardTitle>
                      <Trophy className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Turnamen yang diikuti</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Skor Pertandingan</CardTitle>
                      <ListChecks className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">Pertandingan selesai</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Turnamen Mendatang</CardTitle>
                      <CardDescription>Turnamen yang akan datang dalam 7 hari ke depan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2].map((i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                              <Trophy className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">MLBB Championship Series {i}</p>
                              <p className="text-xs text-muted-foreground">
                                {i === 1 ? "Besok" : "3 hari lagi"} - Mobile Legends
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Aktivitas Tim Terbaru</CardTitle>
                      <CardDescription>Aktivitas dari tim yang Anda ikuti</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=T${i}`} />
                              <AvatarFallback>T{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">Team Alpha {i}</p>
                              <p className="text-xs text-muted-foreground">
                                {i === 1
                                  ? "Mendaftar turnamen baru"
                                  : i === 2
                                    ? "Menambahkan anggota baru"
                                    : "Menyelesaikan pertandingan"}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">{i}h yang lalu</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="teams" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tim Saya</CardTitle>
                    <CardDescription>Tim yang Anda ikuti atau kelola</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=48&width=48&text=T${i}`} />
                            <AvatarFallback>T{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium leading-none">Team Alpha {i}</p>
                            <p className="text-sm text-muted-foreground">
                              {i === 1 ? "Mobile Legends" : "PUBG Mobile"} • {i === 1 ? "5" : "4"} Anggota
                            </p>
                          </div>
                          <Button>Lihat Detail</Button>
                        </div>
                      ))}
                      <Button className="w-full" variant="outline">
                        Buat Tim Baru
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="players" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Pemain</CardTitle>
                    <CardDescription>Informasi profil pemain Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder.svg?height=80&width=80" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 text-center sm:text-left">
                          <h3 className="text-xl font-bold">Username</h3>
                          <p className="text-sm text-muted-foreground">Bergabung sejak 1 Januari 2023</p>
                          <div className="flex flex-wrap gap-2">
                            <div className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              Mobile Legends
                            </div>
                            <div className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              PUBG Mobile
                            </div>
                          </div>
                        </div>
                        <Button>Edit Profil</Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium text-muted-foreground">Turnamen</div>
                          <div className="text-2xl font-bold">12</div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium text-muted-foreground">Kemenangan</div>
                          <div className="text-2xl font-bold">8</div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium text-muted-foreground">Win Rate</div>
                          <div className="text-2xl font-bold">67%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tournaments">
                <TournamentList />
              </TabsContent>
              <TabsContent value="scores" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skor Pertandingan Saya</CardTitle>
                    <CardDescription>Riwayat skor pertandingan yang telah Anda ikuti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg border p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="font-medium">MLBB Championship Series {i}</div>
                            <div className="text-sm text-muted-foreground">
                              {i === 1 ? "Hari ini" : i === 2 ? "Kemarin" : "3 hari yang lalu"}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=T${i}`} />
                                <AvatarFallback>T{i}</AvatarFallback>
                              </Avatar>
                              <span>Team Alpha {i}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold">{i === 2 ? 1 : 2}</span>
                              <span className="text-sm text-muted-foreground">vs</span>
                              <span className="font-bold">{i === 2 ? 2 : 0}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Team Beta {i}</span>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=B${i}`} />
                                <AvatarFallback>B{i}</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                          <div className="mt-2 text-right text-sm font-medium">
                            {i === 2 ? (
                              <span className="text-red-500">Kalah</span>
                            ) : (
                              <span className="text-green-500">Menang</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}

function TournamentList() {
  const [filter, setFilter] = useState("all")

  const tournaments = [
    {
      id: 1,
      name: "MLBB Championship Series",
      startDate: "2023-06-15",
      game: "Mobile Legends",
      status: "upcoming",
    },
    {
      id: 2,
      name: "PUBG Mobile Pro League",
      startDate: "2023-06-20",
      game: "PUBG Mobile",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Valorant Champions Tour",
      startDate: "2023-07-01",
      game: "Valorant",
      status: "upcoming",
    },
    {
      id: 4,
      name: "Free Fire World Series",
      startDate: "2023-07-10",
      game: "Free Fire",
      status: "upcoming",
    },
    {
      id: 5,
      name: "Call of Duty Mobile Championship",
      startDate: "2023-06-05",
      game: "Call of Duty Mobile",
      status: "ongoing",
    },
    {
      id: 6,
      name: "League of Legends Wild Rift Invitational",
      startDate: "2023-05-25",
      game: "Wild Rift",
      status: "ongoing",
    },
  ]

  const filteredTournaments =
    filter === "all" ? tournaments : tournaments.filter((t) => t.game === filter || t.status === filter)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Turnamen</CardTitle>
        <CardDescription>Turnamen yang tersedia untuk didaftarkan</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Semua
          </Button>
          <Button
            variant={filter === "Mobile Legends" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Mobile Legends")}
          >
            Mobile Legends
          </Button>
          <Button
            variant={filter === "PUBG Mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("PUBG Mobile")}
          >
            PUBG Mobile
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("upcoming")}
          >
            Akan Datang
          </Button>
          <Button variant={filter === "ongoing" ? "default" : "outline"} size="sm" onClick={() => setFilter("ongoing")}>
            Sedang Berlangsung
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-bold truncate">{tournament.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="flex-1">Mulai: {new Date(tournament.startDate).toLocaleDateString("id-ID")}</span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {tournament.game}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span
                      className={`text-xs font-medium ${
                        tournament.status === "upcoming" ? "text-blue-600" : "text-green-600"
                      }`}
                    >
                      {tournament.status === "upcoming" ? "Akan Datang" : "Sedang Berlangsung"}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        // Placeholder for React Router navigation
                        console.log(`Navigate to /turnamen/${tournament.id}`)
                      }}
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
