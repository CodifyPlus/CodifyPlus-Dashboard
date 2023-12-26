import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Loader,
  Center,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import links from "./components/data/links";
import footerLinks from "./components/data/footerLinks";
import { NovuProvider } from "@novu/notification-center";
import { useSelector } from "react-redux";
import { NOVU_APP_IDENTIFIER, ONESIGNAL_APP_ID } from "./common/Constants";
import OneSignal from "react-onesignal";
import { Notifications } from "@mantine/notifications";
import { lazyRetry } from "./common/lazyRetry";
import { welcomeConsoleLog } from "./common/welcome";
const Navbar = React.lazy(() =>
  lazyRetry(() => import("./components/Fragments/Navbar/Navbar"), "Navbar")
);
const Footer = React.lazy(() =>
  lazyRetry(() => import("./components/Fragments/Footer/Footer"), "Footer")
);
const OurProcess = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/OurProcess"), "OurProcess")
);
const OurServices = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/OurServices"), "OurServices")
);
const Login = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Login"), "Login")
);
const ForgotPassword = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/ForgotPassword"),
    "ForgotPassword"
  )
);
const ResetPassword = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/ResetPassword"),
    "ResetPassword"
  )
);
const Register = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Register"), "Register")
);
const Dashboard = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Dashboard"), "Dashboard")
);
const DashboardHome = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/DashboardHome"), "DashboardHome")
);
const NotificationsPage = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/Notifications"),
    "NotificationsPage"
  )
);
const Profile = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Profile"), "Profile")
);
const EmptyPage = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/EmptyPage"), "EmptyPage")
);
const AllServices = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/AllServices"), "AllServices")
);
const ServiceStatus = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/ServiceStatus"), "ServiceStatus")
);
const AllUsers = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/AllUsers"),
    "AllUsers"
  )
);
const ServiceTemplates = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/ServiceTemplates"),
    "ServiceTemplates"
  )
);
const Settings = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/Settings"),
    "Settings"
  )
);
const AddUser = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/AddUser"),
    "AddUser"
  )
);
const ManageServices = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/ManageServices"),
    "ManageServices"
  )
);
const AddService = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/AddService"),
    "AddService"
  )
);
const TrackService = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/TrackService"),
    "TrackService"
  )
);
const AllUserServices = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/AllUserServices"),
    "AllUserServices"
  )
);
const EditTemplate = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/EditTemplate"),
    "EditTemplate"
  )
);
const Analytics = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/AdminScreens/Analytics"),
    "Analytics"
  )
);
const ChangePassword = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/ChangePassword"),
    "ChangePassword"
  )
);
const ManageServicesMod = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/ModeratorScreens/ManageServicesMod"),
    "ManageServicesMod"
  )
);
const TrackServiceMod = React.lazy(() =>
  lazyRetry(
    () => import("./components/Screens/ModeratorScreens/TrackServiceMod"),
    "TrackServiceMod"
  )
);
const ChatPage = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/ChatPage"), "ChatPage")
);
const Home = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Home"), "Home")
);
const GSTCalculator = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/GSTCalculator"), "GSTCalculator")
);
const ContactUs = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/ContactUs"), "ContactUs")
);
const Offline = React.lazy(() =>
  lazyRetry(() => import("./components/Screens/Offline"), "Offline")
);

export async function runOneSignal() {
  await OneSignal.init({
    appId: ONESIGNAL_APP_ID!,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Notifications.setDefaultUrl(
    "https://dashboard.codifyplus.com/dashboard/notifications"
  );
  // OneSignal.Slidedown.promptPush();
}

export default function App() {
  const [enableFooter, setEnableFooter] = React.useState(true);
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const [networkStatus, setNetworkStatus] = useState(() => {
    if (navigator.onLine) {
      console.log("Connected to network.");
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    window.ononline = (e) => {
      console.log("Connected to network.");
      setNetworkStatus(true);
    };
    window.onoffline = (e) => {
      console.log("Network connection lost.");
      setNetworkStatus(false);
      navigate("/offline");
    };
    runOneSignal();
    welcomeConsoleLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStatus]);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Mulish, sans-serif",
          primaryColor: "yellow",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <NovuProvider
          subscriberId={currentUser?.username}
          applicationIdentifier={NOVU_APP_IDENTIFIER!}
        >
          <Navbar links={links.links} />
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Home />
                </React.Suspense>
              }
            />
            <Route
              index
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Home />
                </React.Suspense>
              }
            />
            <Route
              path="gst-calculator"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <GSTCalculator />
                </React.Suspense>
              }
            />
            <Route
              path="contact-us"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <ContactUs />
                </React.Suspense>
              }
            />
            <Route
              path="our-process"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <OurProcess />
                </React.Suspense>
              }
            />
            <Route
              path="our-services"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <OurServices />
                </React.Suspense>
              }
            />
            <Route
              path="offline"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Offline />
                </React.Suspense>
              }
            />
            <Route
              path="login"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              path="forgot-password"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <ForgotPassword />
                </React.Suspense>
              }
            />
            <Route
              path="reset-password/:token"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <ResetPassword />
                </React.Suspense>
              }
            />
            <Route
              path="register"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Register />
                </React.Suspense>
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <EmptyPage />
                </React.Suspense>
              }
            />
            <Route
              path="dashboard"
              element={
                <React.Suspense
                  fallback={
                    <>
                      <Center>
                        <Loader variant="bars" />
                      </Center>
                    </>
                  }
                >
                  <Dashboard setEnableFooter={setEnableFooter} />
                </React.Suspense>
              }
            >
              <Route
                path="home"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <DashboardHome />
                  </React.Suspense>
                }
              />
              <Route
                path="notifications"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <NotificationsPage />
                  </React.Suspense>
                }
              />
              <Route
                path="chat"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ChatPage />
                  </React.Suspense>
                }
              />
              <Route
                path="profile"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <Profile />
                  </React.Suspense>
                }
              />
              <Route
                path="analytics"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <Analytics />
                  </React.Suspense>
                }
              />
              <Route
                path="allservices"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <AllServices />
                  </React.Suspense>
                }
              />
              <Route
                path="all-user-services"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <AllUserServices />
                  </React.Suspense>
                }
              >
                <Route
                  path="*"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <Center>
                            <Loader variant="bars" />
                          </Center>
                        </>
                      }
                    >
                      <AllUserServices />
                    </React.Suspense>
                  }
                />
              </Route>
              <Route
                path="template"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <EditTemplate />
                  </React.Suspense>
                }
              >
                <Route
                  path="*"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <Center>
                            <Loader variant="bars" />
                          </Center>
                        </>
                      }
                    >
                      <EditTemplate />
                    </React.Suspense>
                  }
                />
              </Route>
              <Route
                path="changepassword"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ChangePassword />
                  </React.Suspense>
                }
              />
              <Route
                path="servicestatus"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ServiceStatus />
                  </React.Suspense>
                }
              >
                <Route
                  path="*"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <Center>
                            <Loader variant="bars" />
                          </Center>
                        </>
                      }
                    >
                      <ServiceStatus />
                    </React.Suspense>
                  }
                />
              </Route>
              <Route
                path="mod/manageservices"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ManageServicesMod />
                  </React.Suspense>
                }
              />
              <Route
                path="mod/track"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <TrackServiceMod />
                  </React.Suspense>
                }
              >
                <Route
                  path="*"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <Center>
                            <Loader variant="bars" />
                          </Center>
                        </>
                      }
                    >
                      <TrackServiceMod />
                    </React.Suspense>
                  }
                />
              </Route>
              <Route
                path="allusers"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <AllUsers />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="templates"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ServiceTemplates />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="settings"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <Settings />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="adduser"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <AddUser />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="manageservices"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <ManageServices />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="addservice"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <AddService />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="track"
                element={
                  <React.Suspense
                    fallback={
                      <>
                        <Center>
                          <Loader variant="bars" />
                        </Center>
                      </>
                    }
                  >
                    <TrackService />
                  </React.Suspense>
                }
              >
                <Route
                  path="*"
                  element={
                    <React.Suspense
                      fallback={
                        <>
                          <Center>
                            <Loader variant="bars" />
                          </Center>
                        </>
                      }
                    >
                      <TrackService />
                    </React.Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
          {!enableFooter ? <></> : <Footer data={footerLinks.data} />}
        </NovuProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
