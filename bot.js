import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

// Use your token from the .env file
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const ideas = {
  study: [
    {
      title: "Pomodoro Study Method",
      description: "Use the Pomodoro technique (25 mins study, 5 mins break)",
      task: "Complete 4 Pomodoro sessions today"
    },
    {
      title: "Weekend Revision",
      description: "Revise everything you studied this week",
      task: "Take a mock test or quiz"
    },
    {
      title: "Study Group",
      description: "Join or form a 3-person study group",
      task: "Schedule your first group study this weekend"
    }
  ],
  coding: [
    {
      title: "Weather App",
      description: "Build a simple weather app using HTML, CSS, JS & OpenWeather API",
      task: "Display current weather and forecast for any city"
    },
    {
      title: "Portfolio Website",
      description: "Create your personal developer portfolio",
      task: "Add your projects, resume, and contact form"
    },
    {
      title: "Telegram Bot",
      description: "Build a Telegram bot that gives suggestions",
      task: "Use node-telegram-bot-api and deploy it"
    }
  ],
  diy: [
    {
      title: "Paper Flower Craft",
      description: "Create decorative flowers using paper",
      task: "Make at least 3 different designs"
    },
    {
      title: "Custom Mug Painting",
      description: "Paint your own design on a mug",
      task: "Gift it to a friend or keep it as decor"
    },
    {
      title: "Cardboard Organizer",
      description: "Make a desk organizer using recycled cardboard",
      task: "Design with 3+ compartments"
    }
  ],
  startup: [
    {
      title: "Home Food Delivery",
      description: "Start a hyperlocal food delivery service for homemade meals",
      task: "Validate idea with 5 potential customers"
    },
    {
      title: "AI Resume Builder",
      description: "Build a tool that creates resumes from user inputs",
      task: "Launch a working MVP version"
    },
    {
      title: "Student Services Platform",
      description: "A marketplace for college students offering part-time services",
      task: "Build and launch a basic website"
    }
  ],
  life: [
    {
      title: "5 AM Club",
      description: "Wake up at 5 AM for 7 consecutive days",
      task: "Journal how your day improves"
    },
    {
      title: "Daily Journaling",
      description: "Write 5 sentences about your day every night",
      task: "Do this for a full week"
    },
    {
      title: "Digital Detox",
      description: "Take a break from social media for a week",
      task: "Log out of all platforms temporarily"
    }
  ]
};

// Handle /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Welcome ${msg.from.first_name}!\nChoose a suggestion category:`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📚 Study", callback_data: "study" }],
        [{ text: "💻 Coding", callback_data: "coding" }],
        [{ text: "🛠 DIY", callback_data: "diy" }],
        [{ text: "🚀 Startup", callback_data: "startup" }],
        [{ text: "🧘 Life", callback_data: "life" }]
      ]
    }
  });
});

// Handle button suggestions
bot.on('callback_query', (callbackQuery) => {
  const category = callbackQuery.data;
  const ideaList = ideas[category];
  const idea = ideaList[Math.floor(Math.random() * ideaList.length)];

  const message = `💡 *${idea.title}*\n\n📝 ${idea.description}\n\n✅ *Task:* ${idea.task}`;

  bot.sendMessage(callbackQuery.message.chat.id, message, {
    parse_mode: 'Markdown'
  });
});
