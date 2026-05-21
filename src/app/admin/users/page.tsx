"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageContainer } from "@/components/layout/page-container"
import { api } from "@/lib/trpc"

const roleBadge: Record<string, "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  KITCHEN: "secondary",
  CUSTOMER: "outline",
}

export default function AdminUsers() {
  const { data: users = [] } = api.user.getAll.useQuery()

  return (
    <PageContainer pageTitle="Users" pageDescription="Manage registered users.">
      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={roleBadge[user.role] || "outline"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No users found.</p>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}
