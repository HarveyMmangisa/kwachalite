
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Manage your profile information.</p>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-2xl">John Doe</CardTitle>
                <CardDescription>john.doe@example.com</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p>This page is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
