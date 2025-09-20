import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  User, 
  Bell, 
  Shield, 
  Accessibility, 
  Globe, 
  Palette,
  Volume2,
  Type,
  Save,
  Eye
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    organization: "Tech Startup Inc.",
    phone: "+1 (555) 123-4567"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    deadlineReminders: true,
    statusUpdates: true,
    weeklyDigest: false
  });

  const [accessibility, setAccessibility] = useState({
    language: "English",
    colorBlindMode: false,
    textToSpeech: false,
    fontSize: "Medium",
    highContrast: false,
    reducedMotion: false
  });

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profile);
  };

  const handleNotificationToggle = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleAccessibilityToggle = (key: string, value: boolean | string) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-xl">GrantBot</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/grants" className="text-muted-foreground hover:text-foreground transition-colors">Grants</Link>
            <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">Chats</Link>
            <Link to="/settings" className="text-foreground font-medium">Settings</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and accessibility options.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              Accessibility
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal and organization details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={profile.organization}
                    onChange={(e) => setProfile(prev => ({ ...prev, organization: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Button onClick={handleProfileUpdate} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("emailNotifications", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("pushNotifications", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Deadline Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about application deadlines</p>
                    </div>
                    <Switch
                      checked={notifications.deadlineReminders}
                      onCheckedChange={(checked) => handleNotificationToggle("deadlineReminders", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Status Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates on application status changes</p>
                    </div>
                    <Switch
                      checked={notifications.statusUpdates}
                      onCheckedChange={(checked) => handleNotificationToggle("statusUpdates", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary of activity and opportunities</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationToggle("weeklyDigest", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Settings */}
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Options</CardTitle>
                <CardDescription>
                  Customize your experience for better accessibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Language
                    </Label>
                    <Select value={accessibility.language} onValueChange={(value) => handleAccessibilityToggle("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Español</SelectItem>
                        <SelectItem value="French">Français</SelectItem>
                        <SelectItem value="German">Deutsch</SelectItem>
                        <SelectItem value="Chinese">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Color-Blind Friendly Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">Enhanced color contrast and patterns</p>
                    </div>
                    <Switch
                      checked={accessibility.colorBlindMode}
                      onCheckedChange={(checked) => handleAccessibilityToggle("colorBlindMode", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        Text-to-Speech
                      </Label>
                      <p className="text-sm text-muted-foreground">Enable voice reading of text content</p>
                    </div>
                    <Switch
                      checked={accessibility.textToSpeech}
                      onCheckedChange={(checked) => handleAccessibilityToggle("textToSpeech", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Font Size
                    </Label>
                    <Select value={accessibility.fontSize} onValueChange={(value) => handleAccessibilityToggle("fontSize", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                        <SelectItem value="Extra Large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        High Contrast Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={accessibility.highContrast}
                      onCheckedChange={(checked) => handleAccessibilityToggle("highContrast", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      checked={accessibility.reducedMotion}
                      onCheckedChange={(checked) => handleAccessibilityToggle("reducedMotion", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download My Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control how your data is used and shared.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help improve our services with usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and grants</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that will affect your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;