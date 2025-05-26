"use client"

import { useState } from "react"
import { Trophy, Users, User, ListChecks, Plus, Pencil, Trash2, Search, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-4">
          <h1 className="text-xl font-semibold">Dashboard Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <section className="space-y-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Selamat datang, Admin!</h2>
              <p className="text-muted-foreground">Kelola turnamen, tim, pemain, dan skor pertandingan di sini.</p>
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
                      <CardTitle className="text-sm font-medium">Total Tim</CardTitle>
                      <Users className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+4 dari bulan lalu</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Pemain</CardTitle>
                      <User className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">120</div>
                      <p className="text-xs text-muted-foreground">+12 dari bulan lalu</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Turnamen Aktif</CardTitle>
                      <Trophy className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">2 akan berakhir minggu ini</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pertandingan Hari Ini</CardTitle>
                      <ListChecks className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">3 sudah selesai</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Turnamen Terbaru</CardTitle>
                      <CardDescription>Turnamen yang baru ditambahkan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                              <Trophy className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {i === 1
                                  ? "MLBB Championship Series"
                                  : i === 2
                                    ? "PUBG Mobile Pro League"
                                    : "Valorant Champions Tour"}
                              </p>
                              <p className="text-xs text-muted-foreground">Ditambahkan {i} hari yang lalu</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Tim Terbaru</CardTitle>
                      <CardDescription>Tim yang baru mendaftar</CardDescription>
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
                              <p className="text-sm font-medium leading-none">
                                Team {i === 1 ? "Alpha" : i === 2 ? "Beta" : "Gamma"} {i}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {i === 1 ? "Mobile Legends" : i === 2 ? "PUBG Mobile" : "Valorant"} • {i + 3} Anggota
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">{i} hari yang lalu</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="teams">
                <TeamManagement />
              </TabsContent>
              <TabsContent value="players">
                <PlayerManagement />
              </TabsContent>
              <TabsContent value="tournaments">
                <TournamentManagement />
              </TabsContent>
              <TabsContent value="scores">
                <ScoreManagement />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}

function TeamManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Tim</CardTitle>
          <CardDescription>Kelola semua tim yang terdaftar</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Tim
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari tim..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tim</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Jumlah Anggota</TableHead>
              <TableHead>Turnamen Diikuti</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=T${i}`} />
                      <AvatarFallback>T{i}</AvatarFallback>
                    </Avatar>
                    <span>
                      Team {i === 1 ? "Alpha" : i === 2 ? "Beta" : i === 3 ? "Gamma" : i === 4 ? "Delta" : "Epsilon"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {i === 1 || i === 3 ? "Mobile Legends" : i === 2 || i === 5 ? "PUBG Mobile" : "Valorant"}
                </TableCell>
                <TableCell>{i + 3}</TableCell>
                <TableCell>{i === 1 ? 3 : i === 2 ? 2 : i === 3 ? 4 : i === 4 ? 1 : 2}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      i === 1 || i === 3
                        ? "bg-green-100 text-green-800"
                        : i === 2 || i === 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i === 1 || i === 3 ? "Aktif" : i === 2 || i === 5 ? "Pending" : "Nonaktif"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function PlayerManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Pemain</CardTitle>
          <CardDescription>Kelola semua pemain yang terdaftar</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Pemain
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari pemain..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pemain</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tim</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=P${i}`} />
                      <AvatarFallback>P{i}</AvatarFallback>
                    </Avatar>
                    <span>Player{i}</span>
                  </div>
                </TableCell>
                <TableCell>player{i}@example.com</TableCell>
                <TableCell>
                  {i === 1 || i === 3 ? "Team Alpha" : i === 2 ? "Team Beta" : i === 4 ? "Team Delta" : "Team Epsilon"}
                </TableCell>
                <TableCell>
                  {i === 1 || i === 3 ? "Mobile Legends" : i === 2 || i === 5 ? "PUBG Mobile" : "Valorant"}
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      i === 1 || i === 3 || i === 5
                        ? "bg-green-100 text-green-800"
                        : i === 2
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i === 1 || i === 3 || i === 5 ? "Aktif" : i === 2 ? "Pending" : "Nonaktif"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TournamentManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Turnamen</CardTitle>
          <CardDescription>Kelola semua turnamen yang tersedia</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Turnamen
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari turnamen..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Turnamen</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {i === 1
                    ? "MLBB Championship Series"
                    : i === 2
                      ? "PUBG Mobile Pro League"
                      : i === 3
                        ? "Valorant Champions Tour"
                        : i === 4
                          ? "Free Fire World Series"
                          : i === 5
                            ? "Call of Duty Mobile Championship"
                            : "League of Legends Wild Rift Invitational"}
                </TableCell>
                <TableCell>
                  {i === 1
                    ? "Mobile Legends"
                    : i === 2
                      ? "PUBG Mobile"
                      : i === 3
                        ? "Valorant"
                        : i === 4
                          ? "Free Fire"
                          : i === 5
                            ? "Call of Duty Mobile"
                            : "Wild Rift"}
                </TableCell>
                <TableCell>
                  {i === 1
                    ? "15 Jun 2023"
                    : i === 2
                      ? "20 Jun 2023"
                      : i === 3
                        ? "01 Jul 2023"
                        : i === 4
                          ? "10 Jul 2023"
                          : i === 5
                            ? "05 Jun 2023"
                            : "25 Mei 2023"}
                </TableCell>
                <TableCell>
                  {i === 1
                    ? "30 Jun 2023"
                    : i === 2
                      ? "10 Jul 2023"
                      : i === 3
                        ? "15 Jul 2023"
                        : i === 4
                          ? "25 Jul 2023"
                          : i === 5
                            ? "20 Jun 2023"
                            : "10 Jun 2023"}
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      i === 1 || i === 2 || i === 3 || i === 4
                        ? "bg-blue-100 text-blue-800"
                        : i === 5 || i === 6
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i === 1 || i === 2 || i === 3 || i === 4
                      ? "Akan Datang"
                      : i === 5 || i === 6
                        ? "Sedang Berlangsung"
                        : "Selesai"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ScoreManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Skor Pertandingan</CardTitle>
          <CardDescription>Kelola semua skor pertandingan</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Skor
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari pertandingan..." className="max-w-sm" />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Turnamen</TableHead>
              <TableHead>Tim 1</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Tim 2</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {i === 1 || i === 2
                    ? "MLBB Championship Series"
                    : i === 3
                      ? "PUBG Mobile Pro League"
                      : i === 4
                        ? "Valorant Champions Tour"
                        : "Call of Duty Mobile Championship"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder.svg?height=24&width=24&text=T${i}`} />
                      <AvatarFallback>T{i}</AvatarFallback>
                    </Avatar>
                    <span>
                      Team {i === 1 ? "Alpha" : i === 2 ? "Beta" : i === 3 ? "Gamma" : i === 4 ? "Delta" : "Epsilon"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold">
                  {i === 1 ? "2 - 0" : i === 2 ? "1 - 2" : i === 3 ? "3 - 1" : i === 4 ? "0 - 2" : "2 - 1"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder.svg?height=24&width=24&text=O${i}`} />
                      <AvatarFallback>O{i}</AvatarFallback>
                    </Avatar>
                    <span>
                      Team {i === 1 ? "Omega" : i === 2 ? "Zeta" : i === 3 ? "Theta" : i === 4 ? "Sigma" : "Kappa"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {i === 1
                    ? "Hari ini"
                    : i === 2
                      ? "Kemarin"
                      : i === 3
                        ? "3 hari yang lalu"
                        : i === 4
                          ? "5 hari yang lalu"
                          : "1 minggu yang lalu"}
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      i === 1 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {i === 1 ? "Menunggu Verifikasi" : "Terverifikasi"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
