import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const stats = {
    pendingProperties: 5,
    pendingApplications: 12,
    activeListings: 45,
    totalUsers: 128,
  };

  const pendingProperties = [
    {
      id: 1,
      landlord: 'Ahmet Yılmaz',
      property: 'Luxury Apartment',
      address: 'Beşiktaş, Istanbul',
      submittedDate: '2024-01-15',
      status: 'Pending Review',
    },
    {
      id: 2,
      landlord: 'Mehmet Demir',
      property: 'Modern Office',
      address: 'Şişli, Istanbul',
      submittedDate: '2024-01-16',
      status: 'Pending Review',
    },
  ];

  const applications = [
    {
      id: 1,
      tenant: 'Ayşe Kaya',
      property: 'Seaside Apartment - Beşiktaş',
      appliedDate: '2024-01-14',
      income: 15000,
      findeksScore: 850,
      status: 'Pending Review',
      workplace: 'Tech Corp',
    },
    {
      id: 2,
      tenant: 'Can Özkan',
      property: 'City Center Studio - Kadıköy',
      appliedDate: '2024-01-13',
      income: 8500,
      findeksScore: 720,
      status: 'Pending Review',
      workplace: 'Design Agency',
    },
  ];

  const serviceRequests = [
    {
      id: 1,
      type: 'Repair',
      landlord: 'Ahmet Yılmaz',
      property: 'Beşiktaş Apartment',
      description: 'Plumbing issue in bathroom',
      priority: 'High',
      status: 'New',
      submittedDate: '2024-01-16',
    },
    {
      id: 2,
      type: 'Valuation',
      landlord: 'Fatma Şahin',
      property: 'Kadıköy Studio',
      description: 'SPK valuation request',
      priority: 'Medium',
      status: 'Sent to Partner',
      submittedDate: '2024-01-15',
    },
    {
      id: 3,
      type: 'Legal',
      landlord: 'Mehmet Demir',
      property: 'Üsküdar House',
      description: 'Contract review needed',
      priority: 'Low',
      status: 'Answered',
      submittedDate: '2024-01-14',
    },
  ];

  const getStatusColor = (status) => {
    if (status.includes('Pending') || status === 'New') {
      return 'bg-warning/10 text-warning border-warning/20';
    }
    if (status.includes('Approved') || status === 'Answered') {
      return 'bg-success/10 text-success border-success/20';
    }
    if (status.includes('Sent')) {
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
    return 'bg-muted text-muted-foreground';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage properties, applications, and service requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Properties</p>
                <p className="text-2xl font-display font-bold text-warning mt-1">
                  {stats.pendingProperties}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
                <p className="text-2xl font-display font-bold text-blue-600 mt-1">
                  {stats.pendingApplications}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-display font-bold text-success mt-1">
                  {stats.activeListings}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-display font-bold text-accent mt-1">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Properties</CardTitle>
                  <Badge variant="outline">{pendingProperties.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
                  >
                    <div>
                      <p className="font-medium text-foreground">{property.property}</p>
                      <p className="text-sm text-muted-foreground">{property.landlord}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Applications</CardTitle>
                  <Badge variant="outline">{applications.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth cursor-pointer"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <div>
                      <p className="font-medium text-foreground">{app.tenant}</p>
                      <p className="text-sm text-muted-foreground">{app.property}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Property Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search properties..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.property}</TableCell>
                      <TableCell>{property.landlord}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(property.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 text-success" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tenant Applications</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search applications..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Findeks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{app.tenant}</TableCell>
                      <TableCell>{app.property}</TableCell>
                      <TableCell>₺{app.income.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-accent/10 text-accent">
                          {app.findeksScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedApplication(app)}
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.type}</TableCell>
                      <TableCell>{request.landlord}</TableCell>
                      <TableCell>{request.property}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Review Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
            <DialogDescription>
              Tenant: {selectedApplication?.tenant}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="font-medium">{selectedApplication.property}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied Date</p>
                  <p className="font-medium">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="font-medium">₺{selectedApplication.income.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Findeks Score</p>
                  <p className="font-medium">{selectedApplication.findeksScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Workplace</p>
                  <p className="font-medium">{selectedApplication.workplace}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assign Score (0-100)</label>
                <Input type="number" min="0" max="100" placeholder="Enter score" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-success hover:bg-success/90">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
