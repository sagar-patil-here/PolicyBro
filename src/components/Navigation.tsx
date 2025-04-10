
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  FileText, 
  BarChartHorizontal,
  Leaf 
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const [userType, setUserType] = useState<'customer' | 'company' | 'admin'>('customer');
  
  // Determine user type based on URL path
  useEffect(() => {
    if (pathname.includes('admin')) {
      setUserType('admin');
    } else if (pathname.includes('company')) {
      setUserType('company');
    } else {
      setUserType('customer');
    }
  }, [pathname]);

  const customerLinks = [
    { name: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'My Policies', href: '/policies', icon: <FileText className="h-5 w-5" /> },
    { name: 'Compare', href: '/compare', icon: <BarChartHorizontal className="h-5 w-5" /> },
    { name: 'Eco Rewards', href: '/rewards', icon: <Leaf className="h-5 w-5" /> },
  ];

  const companyLinks = [
    { name: 'Dashboard', href: '/company', icon: <Home className="h-5 w-5" /> },
    { name: 'Products', href: '/company/products', icon: <Shield className="h-5 w-5" /> },
    { name: 'Analytics', href: '/company/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Compliance', href: '/company/compliance', icon: <FileText className="h-5 w-5" /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: <Home className="h-5 w-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Shield className="h-5 w-5" /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'System', href: '/admin/system', icon: <Settings className="h-5 w-5" /> },
  ];

  const links = userType === 'admin' ? adminLinks : userType === 'company' ? companyLinks : customerLinks;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={userType === 'admin' ? '/admin' : userType === 'company' ? '/company' : '/'} className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PolicyCompass</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userType === 'admin' ? 'AD' : userType === 'company' ? 'CO' : 'JD'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {userType === 'admin' ? 'Admin Account' : userType === 'company' ? 'Company Account' : 'John Doe'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex w-full cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {userType === 'admin' ? (
                    <Link to="/" className="flex w-full cursor-pointer">
                      <Home className="w-4 h-4 mr-2" />
                      <span>Customer View</span>
                    </Link>
                  ) : userType === 'company' ? (
                    <Link to="/" className="flex w-full cursor-pointer">
                      <Home className="w-4 h-4 mr-2" />
                      <span>Customer View</span>
                    </Link>
                  ) : (
                    <Link to="/admin" className="flex w-full cursor-pointer">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex w-full cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
