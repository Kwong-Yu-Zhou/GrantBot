import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, DollarSign, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Application {
  id: string;
  grantTitle: string;
  amount: string;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected';
  submittedDate: string;
  businessName: string;
}

const PastApplications = () => {
  const applications: Application[] = [
    {
      id: "1",
      grantTitle: "Small Business Innovation Grant",
      amount: "$45,000",
      status: "under-review",
      submittedDate: "2024-01-15",
      businessName: "Tech Solutions Pty Ltd"
    },
    {
      id: "2", 
      grantTitle: "Export Market Development Grant",
      amount: "$120,000",
      status: "approved",
      submittedDate: "2023-12-08",
      businessName: "Global Exports Co"
    },
    {
      id: "3",
      grantTitle: "Sustainability Transition Grant", 
      amount: "$85,000",
      status: "submitted",
      submittedDate: "2024-02-03",
      businessName: "Green Manufacturing Ltd"
    },
    {
      id: "4",
      grantTitle: "Research & Development Grant",
      amount: "$200,000", 
      status: "rejected",
      submittedDate: "2023-11-22",
      businessName: "Innovation Labs Inc"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✓';
      case 'rejected': return '✗';
      case 'under-review': return '⏳';
      case 'submitted': return '📤';
      default: return '?';
    }
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Past Applications</h1>
            <p className="text-muted-foreground">Review your grant application history and track progress</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{applications.filter(a => a.status === 'under-review' || a.status === 'submitted').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <p className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">$120K</p>
                <p className="text-sm text-muted-foreground">Funding Secured</p>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">{application.grantTitle}</CardTitle>
                      <p className="text-muted-foreground">{application.businessName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)} {application.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{application.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Application #{application.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Download PDF
                    </Button>
                    {(application.status === 'submitted' || application.status === 'under-review') && (
                      <Button variant="outline" size="sm">
                        Track Status
                      </Button>
                    )}
                    {application.status === 'rejected' && (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {applications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any grant applications yet. Start your first application to get funding for your business.
                </p>
                <Link to="/application">
                  <Button>Start Your First Application</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastApplications;