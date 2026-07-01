"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Plus,
  MessageSquare,
  ChevronLeft,
  Database,
  Sparkles,
  Code,
  MoreVertical,
  ArrowRight,
  HelpCircle,
  Code2,
  Download,
  Check,
  Bot,
  Terminal,
  Grid,
  FileSpreadsheet,
  Compass,
  RotateCcw,
  Monitor,
  Layout,
  BookOpen,
  Edit2,
  ArrowLeft
} from "lucide-react";

// Types for Chat Messages
interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  reasoning?: string[];
  sql?: string;
  tokensSpent?: number;
  resultSet?: {
    columns: string[];
    rows: Array<Record<string, any>>;
  };
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function AgentOsDemo() {
  // Tabs: "chat" | "command-center" | "databook"
  const [activeTab, setActiveTab] = useState<"chat" | "command-center" | "databook">("chat");

  // Active states
  const [activeDb, setActiveDb] = useState("CORDA");
  const [dbDropdownOpen, setDbDropdownOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState("conv-1");
  const [reasoningExpanded, setReasoningExpanded] = useState<Record<string, boolean>>({
    "msg-2": true, // Default expanded for the first agent message
    "databook-reasoning": true, // Default expanded for Databook reasoning process
  });
  const [sqlViewOpen, setSqlViewOpen] = useState<Record<string, boolean>>({});
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingStep, setTypingStep] = useState("");
  const [selectedModel, setSelectedModel] = useState("Claude Haiku 4.5 (Fast)");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(true);

  // Dashboard Selector states
  const [activeDashboard, setActiveDashboard] = useState("School Dashboard");
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  // Autoplay state
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [autoplayStatus, setAutoplayStatus] = useState("Autoplay active (Click input to stop)");

  // Pre-configured Conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      title: "What is this database?",
      messages: [
        {
          id: "msg-1",
          sender: "user",
          text: "Give me the number of orders of customer whos customer id is BLAUS",
        },
        {
          id: "msg-2",
          sender: "agent",
          text: "Customer BLAUS has placed 7 orders in the Northwind database.",
          reasoning: [
            "User is asking for the count of orders for a specific customer with CustomerID = 'BLAUS'",
            "This is a quantitative aggregation (COUNT with a WHERE filter)",
            "I'll use execute_sql to get the count of orders for this customer",
          ],
          sql: "SELECT COUNT(*) AS NUMBEROFORDERS FROM Orders WHERE CustomerID = 'BLAUS';",
          tokensSpent: 1052,
          resultSet: {
            columns: ["NUMBEROFORDERS"],
            rows: [{ NUMBEROFORDERS: 7 }],
          },
        },
      ],
    },
    {
      id: "conv-2",
      title: "What is the database about?",
      messages: [
        {
          id: "msg-3",
          sender: "user",
          text: "What is the database about?",
        },
        {
          id: "msg-4",
          sender: "agent",
          text: "The Northwind database contains sales data for a fictitious specialty food exports company. Here are the key tables available and their sizes:",
          reasoning: [
            "User is querying about the database contents and schema",
            "I will query the list of system tables and count their rows to give an overview of the schema"
          ],
          sql: "SELECT t.name AS TABLENAME, s.row_count AS ROWCOUNT FROM sys.tables t JOIN sys.dm_db_partition_stats s ON t.object_id = s.object_id WHERE s.index_id < 2 ORDER BY s.row_count DESC;",
          tokensSpent: 1342,
          resultSet: {
            columns: ["TABLENAME", "ROWCOUNT"],
            rows: [
              { TABLENAME: "Orders", ROWCOUNT: 830 },
              { TABLENAME: "Order Details", ROWCOUNT: 2155 },
              { TABLENAME: "Customers", ROWCOUNT: 91 },
              { TABLENAME: "Products", ROWCOUNT: 77 },
              { TABLENAME: "Suppliers", ROWCOUNT: 29 },
            ],
          },
        },
      ],
    },
  ]);

  // Chat container ref for scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const activeConversationIdRef = useRef(activeConversationId);

  // Keep ref updated for autoplay loop access
  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // Align active DB to tab context
  useEffect(() => {
    if (activeTab === "command-center" || activeTab === "databook") {
      setActiveDb("Albatross");
    } else {
      setActiveDb("CORDA");
    }
  }, [activeTab]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  // Scroll to bottom on new messages
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [activeConversation.messages, isTyping, activeConversationId, activeTab]);

  const toggleReasoning = (messageId: string) => {
    setReasoningExpanded((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const toggleSqlView = (messageId: string) => {
    setSqlViewOpen((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  // Centralized Send Logic
  const submitMessage = (text: string, targetConvId: string) => {
    const userMsgId = `user-msg-${Date.now()}`;
    const newUserMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === targetConvId
          ? { ...c, messages: [...c.messages, newUserMsg] }
          : c
      )
    );

    // Trigger typing simulation
    setIsTyping(true);
    setTypingStep("Analyzing schema...");

    setTimeout(() => {
      setTypingStep("Generating optimal SQL query...");
      setTimeout(() => {
        setTypingStep("Executing query on database...");
        setTimeout(() => {
          setIsTyping(false);
          const agentMsgId = `agent-msg-${Date.now()}`;

          // Construct simulated response
          let responseText = "";
          let sql = "";
          let columns: string[] = [];
          let rows: Array<Record<string, any>> = [];
          let reasoning: string[] = [];

          const lowerText = text.toLowerCase();
          if (lowerText.includes("product") || lowerText.includes("most expensive")) {
            responseText = "Here are the top 3 most expensive products in stock:";
            reasoning = [
              "User is asking for products sorted by price in descending order",
              "Limiting results to the top 3 rows",
              "Executing SQL query with SELECT TOP 3 and ORDER BY UnitPrice DESC"
            ];
            sql = "SELECT TOP 3 ProductName, UnitPrice, UnitsInStock FROM Products ORDER BY UnitPrice DESC;";
            columns = ["ProductName", "UnitPrice", "UnitsInStock"];
            rows = [
              { ProductName: "Côte de Blaye", UnitPrice: 263.5, UnitsInStock: 17 },
              { ProductName: "Thüringer Rostbratwurst", UnitPrice: 123.79, UnitsInStock: 0 },
              { ProductName: "Mishi Kobe Niku", UnitPrice: 97.0, UnitsInStock: 29 },
            ];
          } else if (lowerText.includes("customer") || lowerText.includes("usa")) {
            responseText = "Customer count in the USA:";
            reasoning = [
              "User wants count of customers where Country is 'USA'",
              "COUNT(*) aggregation with a WHERE clause on Country"
            ];
            sql = "SELECT COUNT(*) AS CustomerCount FROM Customers WHERE Country = 'USA';";
            columns = ["CustomerCount"];
            rows = [
              { CustomerCount: 13 },
            ];
          } else {
            responseText = `Based on the database records, here is the result matching your query:`;
            reasoning = [
              "Detecting user request parameters",
              "Executing query to fetch matching database details"
            ];
            sql = "SELECT TOP 1 * FROM Orders ORDER BY OrderDate DESC;";
            columns = ["OrderID", "CustomerID", "OrderDate", "ShipCity"];
            rows = [
              { OrderID: 11077, CustomerID: "RATTC", OrderDate: "2026-05-06", ShipCity: "Albuquerque" },
            ];
          }

          const newAgentMsg: Message = {
            id: agentMsgId,
            sender: "agent",
            text: responseText,
            reasoning,
            sql,
            tokensSpent: Math.floor(Math.random() * 500) + 800,
            resultSet: {
              columns,
              rows,
            },
          };

          setConversations((prev) =>
            prev.map((c) =>
              c.id === targetConvId
                ? { ...c, messages: [...c.messages, newAgentMsg] }
                : c
            )
          );

          // Auto expand reasoning for new message
          setReasoningExpanded((prev) => ({
            ...prev,
            [agentMsgId]: true,
          }));
        }, 1200);
      }, 1000);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    // Turn off autoplay on manual typing submit
    setAutoplayActive(false);
    setAutoplayStatus("Interactive mode");

    submitMessage(inputVal.trim(), activeConversationId);
    setInputVal("");
  };

  const handleAddNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "Autoplay Conversation",
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: "agent",
          text: "Hello! Orcha Agent OS is active. I will now run a demonstration of querying databases.",
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    return newId;
  };

  // Autoplay Typing & Chat Loop (Only triggers on activeTab === "chat")
  useEffect(() => {
    if (!autoplayActive || activeTab !== "chat") return;

    let active = true;

    const runAutoplay = async () => {
      // Step 1: Wait 2.5 seconds after mount
      await sleep(2500);
      if (!active) return;

      // Start new demo conversation
      const currentConvId = handleAddNewChat();
      setAutoplayStatus("Demo typing message...");
      await sleep(1500);
      if (!active) return;

      // Type: "Show me the top 3 most expensive products"
      const text1 = "Show me the top 3 most expensive products";
      for (let i = 1; i <= text1.length; i++) {
        setInputVal(text1.substring(0, i));
        await sleep(Math.random() * 40 + 35);
        if (!active) return;
      }

      setAutoplayStatus("Demonstrating Agent Reasoning...");
      await sleep(1000);
      if (!active) return;

      // Send the message
      submitMessage(text1, currentConvId);
      setInputVal("");

      // Wait 7.5 seconds (covers typing animation and reading response)
      await sleep(7500);
      if (!active) return;

      setAutoplayStatus("Demo typing follow-up...");
      // Type: "How many customers are in the USA?"
      const text2 = "How many customers are in the USA?";
      for (let i = 1; i <= text2.length; i++) {
        setInputVal(text2.substring(0, i));
        await sleep(Math.random() * 40 + 35);
        if (!active) return;
      }

      setAutoplayStatus("Demonstrating SQL execution...");
      await sleep(1000);
      if (!active) return;

      // Send second message
      submitMessage(text2, currentConvId);
      setInputVal("");

      await sleep(7000);
      if (!active) return;
      setAutoplayStatus("Autoplay finished! Feel free to ask your own.");
    };

    runAutoplay();

    return () => {
      active = false;
    };
  }, [autoplayActive, activeTab]);

  // Disable autoplay when user clicks input or types
  const handleInputFocus = () => {
    if (autoplayActive) {
      setAutoplayActive(false);
      setAutoplayStatus("Interactive mode");
      setInputVal("");
    }
  };

  const handleResetDemo = () => {
    // Reset back to original conversations
    setConversations([
      {
        id: "conv-1",
        title: "What is this database?",
        messages: [
          {
            id: "msg-1",
            sender: "user",
            text: "Give me the number of orders of customer whos customer id is BLAUS",
          },
          {
            id: "msg-2",
            sender: "agent",
            text: "Customer BLAUS has placed 7 orders in the Northwind database.",
            reasoning: [
              "User is asking for the count of orders for a specific customer with CustomerID = 'BLAUS'",
              "This is a quantitative aggregation (COUNT with a WHERE filter)",
              "I'll use execute_sql to get the count of orders for this customer",
            ],
            sql: "SELECT COUNT(*) AS NUMBEROFORDERS FROM Orders WHERE CustomerID = 'BLAUS';",
            tokensSpent: 1052,
            resultSet: {
              columns: ["NUMBEROFORDERS"],
              rows: [{ NUMBEROFORDERS: 7 }],
            },
          },
        ],
      },
      {
        id: "conv-2",
        title: "What is the database about?",
        messages: [
          {
            id: "msg-3",
            sender: "user",
            text: "What is the database about?",
          },
          {
            id: "msg-4",
            sender: "agent",
            text: "The Northwind database contains sales data for a fictitious specialty food exports company. Here are the key tables available and their sizes:",
            reasoning: [
              "User is querying about the database contents and schema",
              "I will query the list of system tables and count their rows to give an overview of the schema"
            ],
            sql: "SELECT t.name AS TABLENAME, s.row_count AS ROWCOUNT FROM sys.tables t JOIN sys.dm_db_partition_stats s ON t.object_id = s.object_id WHERE s.index_id < 2 ORDER BY s.row_count DESC;",
            tokensSpent: 1342,
            resultSet: {
              columns: ["TABLENAME", "ROWCOUNT"],
              rows: [
                { TABLENAME: "Orders", ROWCOUNT: 830 },
                { TABLENAME: "Order Details", ROWCOUNT: 2155 },
                { TABLENAME: "Customers", ROWCOUNT: 91 },
                { TABLENAME: "Products", ROWCOUNT: 77 },
                { TABLENAME: "Suppliers", ROWCOUNT: 29 },
              ],
            },
          },
        ],
      },
    ]);
    setActiveConversationId("conv-1");
    setAutoplayActive(true);
    setAutoplayStatus("Autoplay active (Click input to stop)");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* ── PREMIUM TAB SWITCHER (ABOVE CONTAINER) ── */}
      <div className="flex justify-center select-none">
        <div className="bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 flex gap-2 shadow-xl backdrop-blur-md relative overflow-hidden">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${
              activeTab === "chat"
                ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Semantic Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("command-center")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${
              activeTab === "command-center"
                ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>Command Center</span>
          </button>
          <button
            onClick={() => setActiveTab("databook")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 relative z-10 ${
              activeTab === "databook"
                ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Databook</span>
          </button>
        </div>
      </div>

      {/* ── ACTIVE TAB DESCRIPTION ── */}
      <div className="text-center py-1 min-h-[48px] flex items-center justify-center select-none">
        <p key={activeTab} className="text-slate-400 text-sm max-w-3xl leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">
          {activeTab === "chat" && "Query databases using natural language. Inspect reasoning processes, generated raw SQL queries, and dynamic tabular result sets in real-time."}
          {activeTab === "command-center" && "Create dashboards with no limits and no feature creeping. Customize real-time data distributions and statistics instantly."}
          {activeTab === "databook" && "Save your past conversations and monitor them in real-time with Databook. Maintain comprehensive execution history and performance metrics."}
        </p>
      </div>

      {/* ── MAIN DESKTOP CONTAINER ── */}
      <div className={`w-full rounded-3xl border border-slate-800 bg-[#f8fafc] shadow-[0_20px_60px_-15px_rgba(20,184,166,0.3)] overflow-hidden font-sans text-slate-800 ${isDarkMode ? "dark" : ""}`}>
        
        {/* APP DESKTOP WINDOW */}
        <div className="flex flex-col h-[740px] bg-[#f8fafc] overflow-hidden relative">
          
          {/* TOP BAR BAR */}
          <header className="h-14 border-b border-slate-200/80 bg-white px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              {/* Search bar mock */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-60">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-400">Search configurations...</span>
                <kbd className="ml-auto text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 font-mono">⌘K</kbd>
              </div>

              {/* Autoplay Status Indicator (Only in Chat view) */}
              {activeTab === "chat" && (
                <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-semibold text-purple-600">
                  <span className={`w-1.5 h-1.5 rounded-full ${autoplayActive ? "bg-purple-500 animate-ping" : "bg-slate-400"}`} />
                  <span>{autoplayStatus}</span>
                  {!autoplayActive && (
                    <button 
                      onClick={handleResetDemo}
                      className="ml-1 text-purple-700 hover:text-purple-900 flex items-center gap-0.5 border-l border-purple-200 pl-1.5"
                    >
                      <RotateCcw className="h-2.5 w-2.5" /> Replay Autoplay
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Dark Mode toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Notification bell */}
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              </button>

              {/* User Profile dropdown */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  J
                </div>
                <span className="text-sm font-medium text-slate-700">James</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </header>

          {/* WORKSPACE BODY */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            
            {/* SIDEBAR (LEFT) - Visual replica, click links to change active tab */}
            <aside className="w-60 border-r border-slate-200/80 bg-white flex flex-col justify-between shrink-0">
              {/* Logo and DB Selector */}
              <div className="p-4 space-y-4">
                {/* Product Logo */}
                <div className="flex items-center gap-2.5 px-1">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-tight text-sm">Orcha</span>
                    <span className="text-[10px] text-purple-600 font-semibold tracking-wider uppercase font-mono">Agent OS</span>
                  </div>
                </div>

                {/* Database Selector Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setDbDropdownOpen(!dbDropdownOpen)}
                    className="w-full px-3 py-2 bg-purple-50/50 hover:bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs font-semibold text-purple-700 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="h-3.5 w-3.5" />
                      <span>{activeDb}</span>
                    </div>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${dbDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dbDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-50 text-xs text-slate-600 animate-in fade-in slide-in-from-top-1 duration-150">
                      {["CORDA", "Albatross", "NORTHWIND", "SALES_DB"].map((db) => (
                        <button
                          key={db}
                          onClick={() => {
                            setActiveDb(db);
                            setDbDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-left rounded-lg hover:bg-slate-50 flex items-center justify-between ${activeDb === db ? "font-semibold text-purple-600 bg-purple-50/30" : ""}`}
                        >
                          <span>{db}</span>
                          {activeDb === db && <Check className="h-3 w-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Menu items */}
              <div className="flex-1 px-3 space-y-5 overflow-y-auto">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 block mb-2 font-mono">Main</span>
                  <nav className="space-y-1">
                    {[
                      { name: "Chat", icon: MessageSquare, id: "chat" },
                      { name: "Configure", icon: Terminal, id: "configure" },
                      { name: "Command Center", icon: Grid, id: "command-center" },
                      { name: "Databook", icon: FileSpreadsheet, id: "databook", badge: "New", badgeColor: "bg-blue-100 text-blue-700", betaBadge: "Beta" }
                    ].map((item) => {
                      const isSelected = (item.id === "chat" && activeTab === "chat") || 
                                         (item.id === "command-center" && activeTab === "command-center") ||
                                         (item.id === "databook" && activeTab === "databook");
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            if (item.id === "chat") setActiveTab("chat");
                            if (item.id === "command-center") setActiveTab("command-center");
                            if (item.id === "databook") setActiveTab("databook");
                          }}
                          className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold transition-all duration-200 ${isSelected ? "bg-purple-50 text-purple-600 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                        >
                          <item.icon className={`h-4 w-4 ${isSelected ? "text-purple-600" : "text-slate-400"}`} />
                          <span>{item.name}</span>
                          
                          {item.badge && (
                            <span className={`ml-auto px-1.5 py-0.5 rounded text-[8px] font-bold ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                          {item.betaBadge && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-orange-100 text-orange-700">
                              {item.betaBadge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 block mb-2 font-mono">Tools</span>
                  <nav className="space-y-1">
                    {[
                      { name: "Market Place", icon: Compass },
                      { name: "Custom Tools", icon: Code2 },
                      { name: "Developers", icon: HelpCircle }
                    ].map((item) => (
                      <button
                        key={item.name}
                        className="w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                      >
                        <item.icon className="h-4 w-4 text-slate-400" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Systems Operational bottom bar */}
              <div className="p-4 border-t border-slate-100 shrink-0 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-slate-500">Systems operational</span>
              </div>
            </aside>

            {/* SUB-SIDEBAR (CONVERSATIONS) - Only active in Chat view */}
            {activeTab === "chat" && isSubSidebarOpen && (
              <aside className="w-60 border-r border-slate-200/80 bg-white flex flex-col shrink-0 animate-in slide-in-from-left duration-300">
                <div className="p-4 flex items-center justify-between border-b border-slate-100/60 shrink-0">
                  <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">Conversations</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handleAddNewChat}
                      className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => setIsSubSidebarOpen(false)}
                      className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversationId(conv.id);
                        setAutoplayActive(false);
                        setAutoplayStatus("Interactive mode");
                      }}
                      className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all duration-200 group relative ${activeConversationId === conv.id ? "bg-purple-50 text-purple-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                      <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${activeConversationId === conv.id ? "text-purple-600" : "text-slate-400"}`} />
                      <span className="truncate pr-4">{conv.title}</span>
                      <MoreVertical className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 transition-opacity" />
                    </button>
                  ))}
                </div>
              </aside>
            )}

            {/* Toggle sidebar button if closed (Only for Chat view) */}
            {activeTab === "chat" && !isSubSidebarOpen && (
              <button 
                onClick={() => setIsSubSidebarOpen(true)}
                className="absolute left-64 top-20 z-40 p-1.5 rounded-r-lg bg-white border border-l-0 border-slate-200 shadow-md text-slate-400 hover:text-slate-700 transition-all hover:pl-2.5"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {/* MAIN WORKSPACE CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">
              
              {/* VIEW 1: SEMANTIC CHAT */}
              {activeTab === "chat" && (
                <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
                  {/* Top CSV warning / Limit message */}
                  <div className="bg-purple-50/40 border-b border-slate-200/60 px-6 py-2.5 flex items-center justify-between shrink-0">
                    <span className="text-[11px] font-medium text-slate-500">
                      • Showing first 20 of 50 rows (limit reached)
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                      <button className="text-purple-600 hover:underline font-semibold flex items-center gap-1">
                        <Bot className="h-3 w-3" /> View full dataset
                      </button>
                      <button className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 font-semibold flex items-center gap-1.5 transition-colors">
                        <Download className="h-3.5 w-3.5" /> Download CSV
                      </button>
                    </div>
                  </div>

                  {/* Messages Scroll Area */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                    {activeConversation.messages.map((message) => (
                      <div key={message.id} className="space-y-3">
                        
                        {/* Sender Header */}
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${message.sender === "user" ? "bg-sky-100 text-sky-600" : "bg-purple-100 text-purple-600"}`}>
                            {message.sender === "user" ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-sky-600 bg-sky-100" />
                            ) : (
                              <Sparkles className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">
                              {message.sender === "user" ? "You" : "Orcha Agent"}
                            </span>
                          </div>
                        </div>

                        {/* Message body container */}
                        <div className="pl-11 space-y-4 max-w-3xl">
                          {/* Collapsible Reasoning Process Block */}
                          {message.reasoning && (
                            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
                              <button
                                onClick={() => toggleReasoning(message.id)}
                                className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-600 border-b border-slate-100 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <Code className="h-3.5 w-3.5 text-purple-500" />
                                  <span>Reasoning Process</span>
                                </div>
                                {reasoningExpanded[message.id] ? (
                                  <ChevronDown className="h-4 w-4 text-slate-400" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-slate-400" />
                                )}
                              </button>

                              {reasoningExpanded[message.id] && (
                                <div className="p-4 text-[11px] text-slate-500 space-y-2 bg-white/50 border-t border-slate-100 font-mono">
                                  {message.reasoning.map((step, idx) => (
                                    <div key={idx} className="flex gap-2 leading-relaxed">
                                      <span className="text-purple-400">-</span>
                                      <span>{step}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Agent text message */}
                          <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                            {message.sender === "agent" ? (
                              <>
                                <p>{message.text.split("Summary")[0]}</p>
                                {message.text.includes("Summary") && (
                                  <div className="mt-3">
                                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">🔍 Summary</span>
                                    <p className="font-medium text-slate-800">
                                      {message.text.substring(message.text.indexOf("Summary") + 7)}
                                    </p>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p className="bg-slate-100/50 px-4 py-3 rounded-2xl inline-block border border-slate-200/50 shadow-sm">{message.text}</p>
                            )}
                          </div>

                          {/* SQL toggle and Token badge */}
                          {message.sender === "agent" && (
                            <div className="flex items-center gap-3 text-xs shrink-0">
                              {message.sql && (
                                <button
                                  onClick={() => toggleSqlView(message.id)}
                                  className="text-purple-600 hover:underline font-semibold flex items-center gap-1.5 transition-all"
                                >
                                  <Code2 className="h-3.5 w-3.5" />
                                  <span>{sqlViewOpen[message.id] ? "Hide SQL" : "View SQL"}</span>
                                </button>
                              )}

                              {message.tokensSpent && (
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200/60 font-semibold text-[10px] flex items-center gap-1 shrink-0">
                                  <Bot className="h-3 w-3" />
                                  ~{message.tokensSpent} tokens spent
                                </span>
                              )}
                            </div>
                          )}

                          {/* SQL code view block */}
                          {message.sql && sqlViewOpen[message.id] && (
                            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 shadow-inner font-mono text-[11px] select-text">
                              <div className="text-slate-500 uppercase tracking-widest text-[9px] mb-2 font-bold flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                                <Terminal className="h-3 w-3" /> generated query
                              </div>
                              <pre className="whitespace-pre-wrap leading-relaxed">{message.sql}</pre>
                            </div>
                          )}

                          {/* Result Set Table Card */}
                          {message.resultSet && (
                            <div className="border border-slate-200/80 rounded-2xl bg-white shadow-md overflow-hidden select-text">
                              <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 select-none">
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-purple-200" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase ml-1">Result Set</span>
                                  <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 font-bold text-[9px]">
                                    {message.resultSet.rows.length} rows • {message.resultSet.columns.length} cols
                                  </span>
                                </div>
                                <MoreVertical className="h-3.5 w-3.5 text-slate-400" />
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="bg-slate-50/40 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">
                                      <th className="py-2.5 px-4 w-12 border-r border-slate-100 text-center font-mono">#</th>
                                      {message.resultSet.columns.map((col) => (
                                        <th key={col} className="py-2.5 px-4 font-semibold text-slate-600">{col}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {message.resultSet.rows.map((row, idx) => (
                                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/20 last:border-b-0">
                                        <td className="py-2 px-4 border-r border-slate-100 text-center font-mono text-slate-400 bg-slate-50/10 select-none">{idx + 1}</td>
                                        {message.resultSet.columns.map((col) => (
                                          <td key={col} className="py-2 px-4 font-bold text-purple-950 font-mono">
                                            {row[col]}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    ))}

                    {/* Typing simulation block */}
                    {isTyping && (
                      <div className="space-y-3 pl-11">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                          <span className="text-xs text-slate-400 font-medium ml-2 animate-pulse">{typingStep}</span>
                        </div>
                        <div className="w-72 h-16 rounded-2xl bg-slate-100/50 border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400 font-medium">
                          Processing query results...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Input Area Card */}
                  <div className="p-4 border-t border-slate-200/60 bg-white shrink-0">
                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden focus-within:border-purple-300 focus-within:ring-1 focus-within:ring-purple-200/50 transition-all">
                      <input
                        type="text"
                        value={inputVal}
                        onFocus={handleInputFocus}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder={autoplayActive ? "Click here to type your own query..." : "Talk to your database"}
                        className="w-full px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none border-b border-slate-100"
                      />

                      <div className="px-4 py-2 bg-slate-50/50 flex items-center justify-between select-none">
                        <div className="flex items-center gap-2.5">
                          <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1.5 shadow-sm">
                            <Database className="h-3 w-3 text-slate-400" />
                            <span>1 DB Selected</span>
                            <ChevronDown className="h-2.5 w-2.5 text-slate-400" />
                          </div>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setModelDropdownOpen(!modelDropdownOpen);
                                setAutoplayActive(false);
                              }}
                              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-1.5 shadow-sm hover:bg-slate-50 transition-colors"
                            >
                              <Bot className="h-3 w-3 text-purple-500" />
                              <span>{selectedModel}</span>
                              <ChevronDown className="h-2.5 w-2.5 text-slate-400" />
                            </button>

                            {modelDropdownOpen && (
                              <div className="absolute bottom-full left-0 mb-1.5 w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-50 text-[10px] text-slate-600 font-bold">
                                {["Claude Haiku 4.5 (Fast)", "Claude 3.5 Sonnet", "GPT-4o mini", "Gemini 2.5 Pro"].map((model) => (
                                  <button
                                    key={model}
                                    type="button"
                                    onClick={() => {
                                      setSelectedModel(model);
                                      setModelDropdownOpen(false);
                                    }}
                                    className={`w-full px-3 py-1.5 text-left rounded-lg hover:bg-slate-50 flex items-center justify-between ${selectedModel === model ? "text-purple-600 bg-purple-50/30" : ""}`}
                                  >
                                    <span>{model}</span>
                                    {selectedModel === model && <Check className="h-3 w-3" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-3 rounded-full bg-purple-200 relative cursor-pointer p-0.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 ml-auto" />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={!inputVal.trim() || isTyping}
                            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${inputVal.trim() && !isTyping ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"}`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="text-center text-[10px] text-slate-400 mt-2">
                      Orcha can make mistakes. Verify important results with the Query Lab.
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: COMMAND CENTER (DASHBOARDS) */}
              {activeTab === "command-center" && (
                <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 animate-in fade-in duration-300">
                  
                  {/* Dashboard Main Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
                        <Monitor className="h-5.5 w-5.5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Command Center</h1>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-purple-50 text-purple-600 border border-purple-100 rounded-full font-mono uppercase">
                            v1.0 alpha
                          </span>
                        </div>
                         <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                          Create dashboards with no limits and no feature creeping. Customize real-time data distributions and statistics instantly.
                        </p>
                      </div>
                    </div>

                    {/* Dashboard Select Button and Menu */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button 
                          onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-sm transition-all"
                        >
                          <Layout className="h-4 w-4 text-purple-600" />
                          <span>{activeDashboard}</span>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </button>

                        {dashboardDropdownOpen && (
                          <div className="absolute top-full right-0 mt-1.5 w-52 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-50 text-xs text-slate-600 animate-in fade-in slide-in-from-top-1 duration-150">
                            {["School Dashboard", "Sales Intelligence", "Inventory System", "Server Analytics"].map((dash) => (
                              <button
                                key={dash}
                                onClick={() => {
                                  setActiveDashboard(dash);
                                  setDashboardDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left rounded-lg hover:bg-slate-50 flex items-center justify-between ${activeDashboard === dash ? "font-semibold text-purple-600 bg-purple-50/30" : ""}`}
                            >
                              <span>{dash}</span>
                              {activeDashboard === dash && <Check className="h-3 w-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/60 flex items-center justify-center text-purple-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Grid Wrap */}
                <div className="p-6 border border-dashed border-purple-200/80 rounded-3xl bg-purple-50/10">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    
                    {/* Left Column (Grid width: 2/5) */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* CARD 1: Active Students */}
                      <div className="bg-white rounded-2xl border border-purple-200/50 shadow-sm p-6 flex flex-col justify-between h-44 hover:shadow-md hover:border-purple-300/60 transition-all duration-300">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                          <span>Active Students Currently Enrolled</span>
                          <MoreVertical className="h-4 w-4 text-slate-400 cursor-pointer" />
                        </div>
                        <div className="text-center space-y-1 my-auto">
                          <span className="text-5xl font-black text-emerald-500 block tracking-tight">20</span>
                          <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase font-mono block">
                            Active Student Count (20)
                          </span>
                        </div>
                      </div>

                      {/* CARD 2: Student Distribution (Donut Chart) */}
                      <div className="bg-white rounded-2xl border border-purple-200/50 shadow-sm p-6 flex flex-col justify-between h-64 hover:shadow-md hover:border-purple-300/60 transition-all duration-300">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                          <span>Male vs Female Student Distribution</span>
                          <MoreVertical className="h-4 w-4 text-slate-400 cursor-pointer" />
                        </div>
                        
                        {/* Donut Chart Ring */}
                        <div className="flex items-center justify-center my-3 relative h-36">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="40"
                              fill="none"
                              stroke="#00b8ff"
                              strokeWidth="16"
                              strokeDasharray="145.75 251.3"
                              strokeDashoffset="0"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="40"
                              fill="none"
                              stroke="#8b35e2"
                              strokeWidth="16"
                              strokeDasharray="100.52 251.3"
                              strokeDashoffset="-145.75"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="40"
                              fill="none"
                              stroke="#00e676"
                              strokeWidth="16"
                              strokeDasharray="5.03 251.3"
                              strokeDashoffset="-246.27"
                            />
                          </svg>

                          {/* Data label callouts */}
                          <div className="absolute top-2 right-4 text-[10px] font-bold text-[#8b35e2]">
                            F 40%
                          </div>
                          <div className="absolute bottom-6 left-4 text-[10px] font-bold text-[#00b8ff]">
                            M 58%
                          </div>
                          <div className="absolute top-14 right-0 text-[10px] font-bold text-[#00e676]">
                            Unknown 2%
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-4 text-[9px] font-bold text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8b35e2]" />
                            <span>F</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00b8ff]" />
                            <span>M</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                            <span>Unknown</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column (Grid width: 3/5, spans height) */}
                    <div className="lg:col-span-3">
                      {/* CARD 3: Enrollment Distribution (Bar Chart) */}
                      <div className="bg-white rounded-2xl border border-purple-200/50 shadow-sm p-6 flex flex-col justify-between h-[336px] lg:h-full hover:shadow-md hover:border-purple-300/60 transition-all duration-300">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                          <span>Enrollment Distribution by Grade Level</span>
                          <MoreVertical className="h-4 w-4 text-slate-400 cursor-pointer" />
                        </div>

                        {/* Bar Chart Container */}
                        <div className="flex flex-col justify-between mt-6 select-none relative h-[220px]">
                          {/* Grid background lines */}
                          <div className="absolute inset-x-0 top-0 h-[180px] flex flex-col justify-between pointer-events-none">
                            {[16, 12, 8, 4, 0].map((val) => (
                              <div key={val} className="w-full flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-400 w-4 text-right font-mono">{val}</span>
                                <div className="flex-1 border-b border-dashed border-slate-100" />
                              </div>
                            ))}
                          </div>

                          {/* Bars container */}
                          <div className="relative z-10 h-[180px] flex items-end justify-between pl-8 pr-4 pb-6">
                            {[
                              { label: "Grade 10", height: "12.5%", color: "bg-[#8b35e2]" },
                              { label: "Grade 11", height: "62.5%", color: "bg-[#00b8ff]" },
                              { label: "Grade 12", height: "43.75%", color: "bg-[#00e676]" },
                              { label: "Grade 7", height: "75%", color: "bg-[#f500b8]" },
                              { label: "Grade 8", height: "81.25%", color: "bg-[#ffb300]" },
                              { label: "Grade 9", height: "31.25%", color: "bg-[#ff6b6b]" },
                              { label: "Unknown", height: "9.38%", color: "bg-[#8b35e2]" }
                            ].map((bar, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-2 w-10">
                                {/* The Bar */}
                                <div 
                                  style={{ height: bar.height }} 
                                  className={`w-6 rounded-t-lg ${bar.color} hover:opacity-90 shadow-sm transition-all duration-500`}
                                />
                                {/* Bottom label */}
                                <span className="text-[9px] font-bold text-slate-400 text-center truncate w-full">
                                  {bar.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: DATABOOK (DETAIL QUESTION VIEW) */}
            {activeTab === "databook" && (
              <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6 animate-in fade-in duration-300">
                
                {/* Back Button */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer select-none">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Databook</span>
                </div>

                {/* Heading Title Block */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner mt-1">
                      <BookOpen className="h-5.5 w-5.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                          How many active students are currently enrolled?
                        </h1>
                        <Edit2 className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        &quot;How many active students are currently enrolled?&quot;
                      </p>

                      
                      {/* Details badges row */}
                      <div className="flex items-center gap-3 pt-2 text-[10px] font-bold select-none">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full flex items-center gap-1.5 border border-slate-200/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                          Database: School Sample
                        </span>
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-full uppercase font-mono tracking-wider">
                          MARIADB
                        </span>
                        <span className="text-slate-400 font-medium">
                          Saved on 05/23/2026
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <button className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/60 flex items-center justify-center text-purple-600 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Section 1: LIVE QUERY RESULT */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-purple-600 tracking-wider uppercase font-mono select-none">
                    Live Query Result
                  </h3>
                  
                  {/* Results Table Card */}
                  <div className="border border-purple-200/60 rounded-2xl bg-white shadow-sm overflow-hidden select-text">
                    {/* Toolbar header */}
                    <div className="px-4 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 select-none">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-200" />
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase ml-1">Result Set</span>
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 font-bold text-[9px]">
                          4 rows • 2 cols
                        </span>
                      </div>
                      <MoreVertical className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
                    </div>

                    {/* Table grid */}
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/20 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">
                          <th className="py-2.5 px-4 w-12 border-r border-slate-100 text-center font-mono">#</th>
                          <th className="py-2.5 px-4 font-semibold text-slate-600">ENROLLMENT_STATUS</th>
                          <th className="py-2.5 px-4 font-semibold text-slate-600 text-right">COUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { status: "Active", count: 20 },
                          { status: "Inactive", count: 12 },
                          { status: "Transferred", count: 17 },
                          { status: "Unknown", count: 1 }
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/20 last:border-b-0">
                            <td className="py-2 px-4 border-r border-slate-100 text-center font-mono text-slate-400 bg-slate-50/10 select-none">
                              {idx + 1}
                            </td>
                            <td className="py-2 px-4 font-semibold text-slate-700">
                              {row.status}
                            </td>
                            <td className="py-2 px-4 font-bold text-purple-950 font-mono text-right">
                              {row.count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Footer pagination toolbar */}
                    <div className="px-4 py-2 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-500 select-none">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        <span>Showing 1 to 4 of 4 records</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] text-slate-400 font-medium mr-2">Page 1 of 1</span>
                        <div className="flex items-center gap-1">
                          {["First", "Prev", "Next", "Last"].map((btn) => (
                            <button
                              key={btn}
                              disabled
                              className="px-2.5 py-1 bg-slate-100 text-slate-300 border border-slate-200/60 rounded-md text-[9px] cursor-not-allowed font-semibold"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: CONVERSATION TRANSCRIPT */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-purple-600 tracking-wider uppercase font-mono select-none">
                    Conversation Transcript
                  </h3>
                  
                  {/* Chat transcript mockup */}
                  <div className="border border-purple-200/50 rounded-2xl bg-white shadow-sm p-6 space-y-4">
                    
                    {/* User Question */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
                          <div className="w-3 h-3 rounded-full border-2 border-sky-600 bg-sky-100" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">You</span>
                      </div>
                      <p className="pl-10 text-xs text-slate-700 bg-slate-100/50 px-4 py-2.5 rounded-2xl inline-block border border-slate-200/30">
                        How many active students are currently enrolled?
                      </p>
                    </div>

                    {/* Orcha Agent Response */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">Orcha Agent</span>
                      </div>

                      {/* Expanded Reasoning Process details */}
                      <div className="pl-10 max-w-3xl space-y-3">
                        <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => toggleReasoning("databook-reasoning")}
                            className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-slate-600 border-b border-slate-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Code className="h-3.5 w-3.5 text-purple-500" />
                              <span>Reasoning Process</span>
                            </div>
                            {reasoningExpanded["databook-reasoning"] ? (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-400" />
                            )}
                          </button>

                          {reasoningExpanded["databook-reasoning"] && (
                            <div className="p-4 text-[11px] text-slate-500 space-y-2 bg-white/50 border-t border-slate-100 font-mono">
                              <div className="flex gap-2">
                                <span className="text-purple-400">•</span>
                                <span>The user is asking for a count of active students based on enrollment status</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-purple-400">•</span>
                                <span>I need to count students where <span className="px-1 py-0.5 bg-purple-50 border border-purple-100 rounded text-purple-600 font-semibold font-sans">enrollment_status</span> indicates they are currently enrolled</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-purple-400">•</span>
                                <span>This is a simple aggregation query (COUNT), so I should use <span className="font-semibold text-slate-700">query_cube</span> if available, or <span className="font-semibold text-slate-700">execute_sql</span> as a fallback</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-purple-400">•</span>
                                <span>Since there&apos;s no pre-built cube mentioned for students, I&apos;ll use SQL to query the students table and filter for active enrollment status</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  </div>
  );
}
