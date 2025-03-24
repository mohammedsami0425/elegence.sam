import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Grid, 
  Users, 
  Images, 
  ShoppingBag, 
  Mail, 
  User, 
  Home,
  LogOut,
  Settings,
  PlusCircle,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch data from API
  const { data: portfolioItems, isLoading: portfolioLoading } = useQuery({
    queryKey: ['/api/portfolio'],
    staleTime: 60000,
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['/api/orders'],
    staleTime: 60000,
    enabled: activeTab === "orders" || activeTab === "overview",
  });

  const { data: freelancers, isLoading: freelancersLoading } = useQuery({
    queryKey: ['/api/freelancers'],
    staleTime: 60000,
    enabled: activeTab === "freelancers" || activeTab === "overview",
  });

  const { data: contactMessages, isLoading: contactLoading } = useQuery({
    queryKey: ['/api/contact'],
    staleTime: 60000,
    enabled: activeTab === "messages" || activeTab === "overview",
  });

  // Delete portfolio item mutation
  const deletePortfolioMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/portfolio/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    }
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      return await apiRequest("PATCH", `/api/orders/${id}`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  });

  // Analytics data (mock for now)
  const analytics = {
    totalOrders: orders?.length || 0,
    totalFreelancers: freelancers?.length || 0,
    totalPortfolioItems: portfolioItems?.length || 0,
    totalMessages: contactMessages?.length || 0,
    pendingOrders: orders?.filter(order => order.status === "pending").length || 0,
    pendingFreelancers: freelancers?.filter(freelancer => freelancer.status === "pending").length || 0,
    unreadMessages: contactMessages?.filter(message => !message.read).length || 0,
  };

  // Handle logout
  const handleLogout = () => {
    // For now, just redirect to home page
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-[#212121] text-white">
        <div className="p-6">
          <div className="font-['Playfair_Display'] text-2xl font-bold">Élégance</div>
          <div className="text-gray-400 text-sm">Admin Dashboard</div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "overview" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("overview")}
          >
            <Grid className="mr-3 h-5 w-5" />
            Overview
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "portfolio" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("portfolio")}
          >
            <Images className="mr-3 h-5 w-5" />
            Portfolio
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "orders" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="mr-3 h-5 w-5" />
            Orders
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "freelancers" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("freelancers")}
          >
            <Users className="mr-3 h-5 w-5" />
            Freelancers
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "messages" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("messages")}
          >
            <Mail className="mr-3 h-5 w-5" />
            Messages
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "profile" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "settings" ? "bg-[#d4af37]/20 text-[#d4af37]" : "text-gray-300 hover:bg-gray-800"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
        
        <div className="p-4 border-t border-gray-800 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-400">admin@elegance.com</div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="bg-white shadow p-4 md:hidden flex items-center justify-between">
          <div className="font-['Playfair_Display'] text-xl font-bold">Élégance</div>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
          </Button>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold font-['Playfair_Display']">Admin Dashboard</h1>
              <p className="text-gray-500">Manage your fashion design business</p>
            </div>
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                      <p className="text-xs text-gray-500">{analytics.pendingOrders} pending</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalPortfolioItems}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Freelancers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalFreelancers}</div>
                      <p className="text-xs text-gray-500">{analytics.pendingFreelancers} pending</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analytics.totalMessages}</div>
                      <p className="text-xs text-gray-500">{analytics.unreadMessages} unread</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest customer orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {ordersLoading ? (
                        <div className="text-center py-4">Loading...</div>
                      ) : orders && orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{order.firstName} {order.lastName}</div>
                                <div className="text-sm text-gray-500">{order.serviceType}</div>
                              </div>
                              <div>
                                <div className={`px-2 py-1 rounded-full text-xs 
                                  ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                    order.status === "completed" ? "bg-green-100 text-green-800" : 
                                    "bg-blue-100 text-blue-800"}`}
                                >
                                  {order.status}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">No orders found</div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveTab("orders")}
                      >
                        View all orders
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Recent Messages */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                      <CardDescription>Latest customer inquiries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {contactLoading ? (
                        <div className="text-center py-4">Loading...</div>
                      ) : contactMessages && contactMessages.length > 0 ? (
                        <div className="space-y-4">
                          {contactMessages.slice(0, 5).map((message) => (
                            <div key={message.id} className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{message.name}</div>
                                <div className="text-sm text-gray-500">{message.subject}</div>
                              </div>
                              <div>
                                <div className={`px-2 py-1 rounded-full text-xs 
                                  ${!message.read ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}
                                >
                                  {message.read ? "Read" : "Unread"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">No messages found</div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveTab("messages")}
                      >
                        View all messages
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Portfolio Management</h2>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Item
                  </Button>
                </div>
                
                {portfolioLoading ? (
                  <div className="text-center py-8">Loading portfolio items...</div>
                ) : portfolioItems && portfolioItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioItems.map((item) => (
                      <Card key={item.id}>
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="h-full w-full object-cover transition-all hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{item.name}</CardTitle>
                          <CardDescription>Category: {item.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                          <div className="mt-2">
                            {item.featured && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                Featured
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deletePortfolioMutation.mutate(item.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No portfolio items found.</p>
                    <Button className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add First Portfolio Item
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order Management</h2>
                
                {ordersLoading ? (
                  <div className="text-center py-8">Loading orders...</div>
                ) : orders && orders.length > 0 ? (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{order.firstName} {order.lastName}</div>
                                  <div className="text-sm text-gray-500">{order.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{order.serviceType}</div>
                              <div className="text-sm text-gray-500">Budget: {order.budget}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                  order.status === "completed" ? "bg-green-100 text-green-800" : 
                                  "bg-blue-100 text-blue-800"}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button 
                                variant="ghost" 
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => {
                                  const newStatus = order.status === "pending" ? "in-progress" : 
                                    order.status === "in-progress" ? "completed" : "pending";
                                  updateOrderStatusMutation.mutate({ id: order.id, status: newStatus });
                                }}
                              >
                                Change Status
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No orders found.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Freelancers Tab */}
            {activeTab === "freelancers" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Freelancer Applications</h2>
                
                {freelancersLoading ? (
                  <div className="text-center py-8">Loading freelancers...</div>
                ) : freelancers && freelancers.length > 0 ? (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {freelancers.map((freelancer) => (
                          <tr key={freelancer.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{freelancer.firstName.charAt(0)}{freelancer.lastName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{freelancer.firstName} {freelancer.lastName}</div>
                                  <div className="text-sm text-gray-500">{freelancer.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{freelancer.specialization}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{freelancer.experience}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{freelancer.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${freelancer.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                  freelancer.status === "approved" ? "bg-green-100 text-green-800" : 
                                  "bg-red-100 text-red-800"}`}
                              >
                                {freelancer.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  className="text-green-600 hover:text-green-900"
                                  onClick={() => {
                                    // Update freelancer status to approved
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => {
                                    // Update freelancer status to rejected
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No freelancer applications found.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Contact Messages</h2>
                
                {contactLoading ? (
                  <div className="text-center py-8">Loading messages...</div>
                ) : contactMessages && contactMessages.length > 0 ? (
                  <div className="space-y-4">
                    {contactMessages.map((message) => (
                      <Card key={message.id} className={message.read ? "bg-white" : "bg-amber-50"}>
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle>{message.subject}</CardTitle>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${!message.read ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {message.read ? "Read" : "Unread"}
                            </span>
                          </div>
                          <CardDescription>
                            From: {message.name} ({message.email})
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-line">{message.message}</p>
                          <div className="text-sm text-gray-500 mt-2">
                            Received: {new Date(message.createdAt).toLocaleString()}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              // Mark as read
                            }}
                            disabled={message.read}
                          >
                            Mark as Read
                          </Button>
                          <Button>
                            Reply via Email
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No contact messages found.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Admin Profile</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <div className="mt-1">Admin User</div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <div className="mt-1">admin@elegance.com</div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500">Role</label>
                          <div className="mt-1">Administrator</div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500">Last Login</label>
                          <div className="mt-1">{new Date().toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Edit Profile</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Website Settings</h2>
                
                <Tabs defaultValue="general">
                  <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Manage your website's general settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Website Name</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                              value="Élégance Fashion Design"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Contact Email</label>
                            <input 
                              type="email" 
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                              value="info@elegancecouture.com"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Phone Number</label>
                            <input 
                              type="text" 
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                              value="+1 (212) 555-6789"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Studio Address</label>
                            <textarea 
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                              rows={3}
                              value="123 Atelier Lane, Fashion District, New York, NY 10001"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
                        <CardDescription>Customize your website's appearance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Primary Color</label>
                            <div className="flex mt-1">
                              <input 
                                type="color" 
                                className="h-10 w-10"
                                value="#d4af37"
                              />
                              <input 
                                type="text" 
                                className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                value="#d4af37"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Secondary Color</label>
                            <div className="flex mt-1">
                              <input 
                                type="color" 
                                className="h-10 w-10"
                                value="#212121"
                              />
                              <input 
                                type="text" 
                                className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                                value="#212121"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Logo</label>
                            <div className="mt-1 flex items-center">
                              <div className="font-['Playfair_Display'] text-xl font-bold mr-4">Élégance</div>
                              <Button variant="outline" size="sm">Change Logo</Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Font Family</label>
                            <select 
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4af37] focus:ring-[#d4af37]"
                            >
                              <option>Playfair Display (Headings)</option>
                              <option>Montserrat (Body)</option>
                              <option>Other...</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage your email notifications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium">New Order Notifications</h3>
                              <p className="text-sm text-gray-500">Receive an email when a new order is placed</p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-[#d4af37] h-4 w-4 text-[#d4af37] border-gray-300 rounded"
                                checked
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium">Contact Form Submissions</h3>
                              <p className="text-sm text-gray-500">Receive an email when someone submits the contact form</p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-[#d4af37] h-4 w-4 text-[#d4af37] border-gray-300 rounded"
                                checked
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium">Freelancer Applications</h3>
                              <p className="text-sm text-gray-500">Receive an email when a freelancer applies</p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-[#d4af37] h-4 w-4 text-[#d4af37] border-gray-300 rounded"
                                checked
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium">Newsletter Signups</h3>
                              <p className="text-sm text-gray-500">Receive an email when someone subscribes to your newsletter</p>
                            </div>
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-[#d4af37] h-4 w-4 text-[#d4af37] border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto">Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;