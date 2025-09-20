import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Upload, FileText, ExternalLink, ArrowLeft, ArrowRight, MessageCircle, Search, FileCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";

type ApplicationStep = 1 | 2 | 3 | 4 | 5;

interface UserInfo {
  businessName: string;
  businessType: string;
  state: string;
  fundingAmount: string;
  grantType: string;
  businessDescription: string;
}

interface Grant {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  eligibility: string;
  description: string;
}

const Application = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    businessName: "",
    businessType: "",
    state: "",
    fundingAmount: "",
    grantType: "",
    businessDescription: ""
  });
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Hi! I'm here to help you apply for Australian government grants. Let's start by gathering some basic information about your business."
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const mockGrants: Grant[] = [
    {
      id: "1",
      title: "Small Business Innovation Grant",
      amount: "Up to $50,000",
      deadline: "March 31, 2024",
      eligibility: "NSW small businesses with innovative projects",
      description: "Supporting innovation and technology development in small businesses"
    },
    {
      id: "2", 
      title: "Export Market Development Grant",
      amount: "Up to $150,000",
      deadline: "April 15, 2024",
      eligibility: "Australian businesses expanding internationally",
      description: "Help businesses develop export markets and increase international competitiveness"
    },
    {
      id: "3",
      title: "Sustainability Transition Grant",
      amount: "Up to $100,000", 
      deadline: "May 20, 2024",
      eligibility: "Businesses implementing sustainable practices",
      description: "Support businesses transitioning to more sustainable operations"
    }
  ];

  const steps = [
    { number: 1, title: "Business Details", icon: MessageCircle },
    { number: 2, title: "Grant Discovery", icon: Search },
    { number: 3, title: "Application Guidance", icon: FileText },
    { number: 4, title: "Compliance Check", icon: FileCheck },
    { number: 5, title: "Submit Application", icon: Globe }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    setChatMessages([...chatMessages, `You: ${currentMessage}`]);
    
    // Simulate AI response based on step
    setTimeout(() => {
      let response = "";
      if (currentStep === 1) {
        response = "Great! Based on your information, I can help you find relevant grants. Let me search for grants that match your criteria.";
      } else if (currentStep === 3) {
        response = "Perfect! I'll guide you through the application process step by step. Here's what you'll need to prepare...";
      } else if (currentStep === 4) {
        response = "Let me check your documentation for compliance with Australian grant requirements...";
      } else if (currentStep === 5) {
        response = "Excellent! Your application looks ready. I'll help you submit it to the relevant government portal.";
      }
      
      setChatMessages(prev => [...prev, `AI Assistant: ${response}`]);
    }, 1000);
    
    setCurrentMessage("");
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={userInfo.businessName}
            onChange={(e) => setUserInfo({...userInfo, businessName: e.target.value})}
            placeholder="Enter your business name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={userInfo.businessType} onValueChange={(value) => setUserInfo({...userInfo, businessType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup</SelectItem>
              <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
              <SelectItem value="nonprofit">Non-profit</SelectItem>
              <SelectItem value="individual">Individual/Sole Trader</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Territory</Label>
          <Select value={userInfo.state} onValueChange={(value) => setUserInfo({...userInfo, state: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nsw">New South Wales</SelectItem>
              <SelectItem value="vic">Victoria</SelectItem>
              <SelectItem value="qld">Queensland</SelectItem>
              <SelectItem value="wa">Western Australia</SelectItem>
              <SelectItem value="sa">South Australia</SelectItem>
              <SelectItem value="tas">Tasmania</SelectItem>
              <SelectItem value="act">Australian Capital Territory</SelectItem>
              <SelectItem value="nt">Northern Territory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fundingAmount">Funding Amount Needed</Label>
          <Select value={userInfo.fundingAmount} onValueChange={(value) => setUserInfo({...userInfo, fundingAmount: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select funding range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-25k">Under $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
              <SelectItem value="over-250k">Over $250,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="grantType">Grant Type</Label>
        <Select value={userInfo.grantType} onValueChange={(value) => setUserInfo({...userInfo, grantType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="What type of grant are you looking for?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="innovation">Innovation & Technology</SelectItem>
            <SelectItem value="export">Export & Trade</SelectItem>
            <SelectItem value="sustainability">Sustainability & Environment</SelectItem>
            <SelectItem value="research">Research & Development</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="employment">Employment & Training</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <Textarea
          id="businessDescription"
          value={userInfo.businessDescription}
          onChange={(e) => setUserInfo({...userInfo, businessDescription: e.target.value})}
          placeholder="Briefly describe your business and what you plan to use the grant for..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Found {mockGrants.length} Matching Grants</h3>
        <p className="text-muted-foreground">Based on your business profile, here are the most relevant grants:</p>
      </div>
      
      <div className="grid gap-4">
        {mockGrants.map((grant) => (
          <Card 
            key={grant.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${selectedGrant?.id === grant.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedGrant(grant)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{grant.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{grant.amount}</Badge>
                    <Badge variant="outline">Deadline: {grant.deadline}</Badge>
                  </div>
                </div>
                {selectedGrant?.id === grant.id && (
                  <CheckCircle className="h-6 w-6 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{grant.description}</p>
              <p className="text-sm"><strong>Eligibility:</strong> {grant.eligibility}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Application Guidance</h3>
        <p className="text-muted-foreground">Here's everything you need to apply for: {selectedGrant?.title}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Business Registration Certificate</span>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Financial Statements (Last 2 years)</span>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Project Proposal</span>
              <Button size="sm">
                AI Generate
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Budget Breakdown</span>
              <Button size="sm">
                AI Generate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Outline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Business Information</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span>Project Description</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span>Budget & Timeline</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span>Expected Outcomes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span>Risk Assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Compliance Check</h3>
        <p className="text-muted-foreground">AI reviewing your application for Australian grant compliance</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Compliance Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Eligibility Requirements</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Passed</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Document Requirements</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Complete</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-yellow-600" />
              <span>Budget Justification</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Needs Review</Badge>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Suggestions for Improvement:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Add more detail to the budget breakdown for equipment costs</li>
              <li>• Include letters of support from key stakeholders</li>
              <li>• Clarify the project timeline in the implementation section</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Submit Application</h3>
        <p className="text-muted-foreground">Ready to submit your application to the government portal</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Application Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Grant</p>
              <p className="font-semibold">{selectedGrant?.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-semibold">{selectedGrant?.amount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Business</p>
              <p className="font-semibold">{userInfo.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p className="font-semibold">{selectedGrant?.deadline}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Submit to Government Portal
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download Application PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const canProceed = () => {
    if (currentStep === 1) {
      return userInfo.businessName && userInfo.businessType && userInfo.state && userInfo.fundingAmount && userInfo.grantType;
    }
    if (currentStep === 2) {
      return selectedGrant !== null;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-xl">Granted</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-2 text-center">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const StepIcon = steps[currentStep - 1].icon;
                    return <StepIcon className="h-6 w-6" />;
                  })()}
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as ApplicationStep)}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1) as ApplicationStep)}
                    disabled={currentStep === 5 || !canProceed()}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      message.startsWith('You:') 
                        ? 'bg-primary text-primary-foreground ml-8' 
                        : 'bg-muted mr-8'
                    }`}>
                      <p className="text-sm">{message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;