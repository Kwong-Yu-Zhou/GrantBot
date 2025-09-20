import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  DollarSign, 
  Calendar, 
  MapPin, 
  MessageSquare,
  Building,
  Zap,
  Heart,
  Leaf
} from "lucide-react";

const Grants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const grants = [
    {
      id: 1,
      title: "Small Business Innovation Research (SBIR) Grant",
      organization: "National Science Foundation",
      amount: "$1,500,000",
      deadline: "March 15, 2024",
      location: "United States",
      category: "Technology",
      description: "Supporting innovative research and development in small businesses with potential for commercialization.",
      icon: Zap,
      tags: ["R&D", "Innovation", "Technology"],
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Renewable Energy Startup Fund",
      organization: "Department of Energy",
      amount: "$750,000",
      deadline: "April 30, 2024",
      location: "United States",
      category: "Environment",
      description: "Funding for startups developing innovative renewable energy solutions and clean technologies.",
      icon: Leaf,
      tags: ["Clean Energy", "Startups", "Environment"],
      difficulty: "High"
    },
    {
      id: 3,
      title: "Women in Tech Leadership Grant",
      organization: "Tech Diversity Foundation",
      amount: "$50,000",
      deadline: "February 28, 2024",
      location: "Global",
      category: "Diversity",
      description: "Supporting women-led technology companies and promoting diversity in the tech industry.",
      icon: Heart,
      tags: ["Diversity", "Women", "Technology"],
      difficulty: "Low"
    },
    {
      id: 4,
      title: "Community Development Block Grant",
      organization: "HUD",
      amount: "$2,000,000",
      deadline: "May 15, 2024",
      location: "United States",
      category: "Community",
      description: "Funding for community development projects that benefit low and moderate-income families.",
      icon: Building,
      tags: ["Community", "Housing", "Development"],
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Healthcare Innovation Grant",
      organization: "NIH",
      amount: "$500,000",
      deadline: "June 30, 2024",
      location: "United States",
      category: "Healthcare",
      description: "Supporting innovative healthcare solutions and medical technology development.",
      icon: Heart,
      tags: ["Healthcare", "Innovation", "Medical"],
      difficulty: "High"
    },
    {
      id: 6,
      title: "Arts and Culture Preservation Fund",
      organization: "National Endowment for the Arts",
      amount: "$25,000",
      deadline: "March 1, 2024",
      location: "United States",
      category: "Arts",
      description: "Preserving and promoting arts and cultural heritage in local communities.",
      icon: Heart,
      tags: ["Arts", "Culture", "Community"],
      difficulty: "Low"
    }
  ];

  const categories = ["All", "Technology", "Environment", "Healthcare", "Community", "Arts", "Diversity"];

  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "All" || grant.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low": return "bg-accent/10 text-accent";
      case "Medium": return "bg-orange-100 text-orange-700";
      case "High": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
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
            <Link to="/grants" className="text-foreground font-medium">Grants</Link>
            <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">Chats</Link>
            <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Grants</h1>
          <p className="text-muted-foreground">Find funding opportunities that match your business and goals.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search grants by name, organization, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredGrants.length} grants {searchQuery && `for "${searchQuery}"`}
            {categoryFilter && categoryFilter !== "All" && ` in ${categoryFilter}`}
          </p>
        </div>

        {/* Grant Cards */}
        <div className="grid gap-6">
          {filteredGrants.map((grant) => (
            <Card key={grant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <grant.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{grant.title}</CardTitle>
                      <CardDescription className="text-base mb-3">
                        {grant.organization}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mb-4">
                        {grant.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {grant.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <Badge className={`text-xs ${getDifficultyColor(grant.difficulty)}`}>
                          {grant.difficulty} Application
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">{grant.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-semibold">{grant.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{grant.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {grant.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={`/chatbot?grant=${grant.id}`} className="flex-1">
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Apply with Chatbot
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No grants found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all available grants.
            </p>
            <Button onClick={() => { setSearchQuery(""); setCategoryFilter(""); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grants;