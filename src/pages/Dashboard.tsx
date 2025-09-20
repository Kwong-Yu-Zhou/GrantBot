import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Search, 
  Settings, 
  Bell, 
  Plus, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  User
} from "lucide-react";

const Dashboard = () => {
  const recentChats = [
    { id: 1, title: "Small Business Innovation Grant", status: "In Progress", lastActivity: "2 hours ago" },
    { id: 2, title: "Renewable Energy Startup Fund", status: "Submitted", lastActivity: "1 day ago" },
    { id: 3, title: "Women in Tech Grant", status: "Draft", lastActivity: "3 days ago" }
  ];

  const notifications = [
    { id: 1, type: "deadline", message: "Small Business Grant deadline in 5 days", time: "1 hour ago" },
    { id: 2, type: "success", message: "Your Renewable Energy application was submitted", time: "1 day ago" },
    { id: 3, type: "update", message: "New grants matching your profile available", time: "2 days ago" }
  ];

  const stats = [
    { title: "Applications Started", value: "12", change: "+2 this week", icon: MessageSquare },
    { title: "Submitted", value: "5", change: "+1 this week", icon: CheckCircle },
    { title: "Total Funding Applied", value: "$2.4M", change: "+$500K this month", icon: DollarSign },
    { title: "Success Rate", value: "68%", change: "+5% improvement", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-xl">GrantBot</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/grants" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Search className="h-4 w-4" />
                Grants
              </Link>
              <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chats
              </Link>
              <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 bg-accent">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">You have 3 active applications and 8 new grant opportunities waiting for you.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-accent">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Link to="/chatbot" className="block">
                <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Start New Application</h3>
                <p className="text-muted-foreground">Begin a new grant application with AI guidance</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Link to="/grants" className="block">
                <Search className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Discover Grants</h3>
                <p className="text-muted-foreground">Find relevant funding opportunities</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Link to="/chatbot" className="block">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Continue Application</h3>
                <p className="text-muted-foreground">Resume your latest application</p>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>Your latest grant application activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentChats.map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{chat.title}</h4>
                      <p className="text-xs text-muted-foreground">{chat.lastActivity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={chat.status === "Submitted" ? "default" : chat.status === "In Progress" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {chat.status}
                      </Badge>
                      <Link to={`/chatbot/${chat.id}`}>
                        <Button variant="ghost" size="sm">
                          Open
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/chatbot" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
              <CardDescription>Important updates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50">
                    {notification.type === "deadline" && <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />}
                    {notification.type === "success" && <CheckCircle className="h-4 w-4 text-accent mt-0.5" />}
                    {notification.type === "update" && <Clock className="h-4 w-4 text-primary mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;