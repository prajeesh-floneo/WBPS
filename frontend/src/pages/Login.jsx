import { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Login = ({ onLogin }) => {
  const [role, setRole] = useState('landlord');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication
    const mockUser = {
      email,
      name: role === 'landlord' ? 'Ahmet Yılmaz' : role === 'tenant' ? 'Ayşe Demir' : 'Admin User',
      role,
    };

    onLogin(mockUser);
  };

  const quickLogin = (userRole) => {
    const mockUsers = {
      landlord: { email: 'landlord@demo.com', name: 'Ahmet Yılmaz', role: 'landlord' },
      tenant: { email: 'tenant@demo.com', name: 'Ayşe Demir', role: 'tenant' },
      admin: { email: 'admin@wbps.com', name: 'Admin User', role: 'admin' },
    };

    onLogin(mockUsers[userRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-12 w-12 text-accent" />
            <div>
              <h1 className="text-4xl font-display font-bold text-foreground">WBPS</h1>
              <p className="text-lg text-muted-foreground">Wealth Builders Property System</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-semibold text-foreground leading-tight">
              Professional Property Management Platform
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Streamline your real estate operations with our comprehensive platform. 
              From tenant screening to contract management, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: 'KVKK Compliant', value: '100%' },
              { label: 'Properties Managed', value: '500+' },
              { label: 'Active Users', value: '1,200+' },
              { label: 'Satisfaction Rate', value: '98%' },
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-lg bg-card shadow-card">
                <div className="text-2xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Login Form */}
        <Card className="shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="landlord">Landlord</TabsTrigger>
                <TabsTrigger value="tenant">Tenant</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value={role} className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-accent hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-accent group">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                {/* Quick Demo Access */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Demo Access</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => quickLogin(role)}
                >
                  Quick Demo Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="#" className="text-accent hover:underline">
                    Sign up now
                  </a>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
