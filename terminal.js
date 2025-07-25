// Terminal functionality
const terminal = document.getElementById('terminal');
const toggleBtn = document.getElementById('toggle-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');
let commandHistory = [];
let historyIndex = -1;

// Embedded content data to avoid fetch issues with file:// protocol
const contentData = {
  "personal": {
    "name": "Jon Vadillo",
    "title": "Software Developer & Web Technology Specialist",
    "subtitle": "Building thoughtful digital experiences and sharing knowledge with the development community.",
    "description": [
      "I am a software developer with over 15 years of experience, specializing in web technologies. I also teach web development, sharing my knowledge with aspiring professionals.",
      "During my free time, I enjoy experimenting with new technologies, giving talks, and publishing open resources. Traveling is one of my passions, and I have also had the opportunity to volunteer in different places.",
      "I am always eager to learn, explore, and contribute to the tech community."
    ],
    "technologies": [
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "PHP",
      "SQL",
      "Docker",
      "Git",
      "NoSQL"
    ]
  },
  "experience": [
    {
      "title": "Professor and Coordinator",
      "company": "Egibide",
      "dates": "Sept. 2017 – Present (7 years 7 months)"
    },
    {
      "title": "Software Engineer & Co-founder",
      "company": "Gesto Deportivo",
      "dates": "Nov. 2017 – Present (7 years 5 months)"
    },
    {
      "title": "Development Technical Assistance",
      "company": "EJIE",
      "dates": "Sept. 2013 – Sept. 2017 (4 years 1 month)"
    },
    {
      "title": "Technical Founder",
      "company": "Konektik",
      "dates": "Mar. 2015 – Apr. 2016 (1 year 2 months)"
    },
    {
      "title": "Programmer Analyst",
      "company": "Necsia (Devoteam | Microsoft Partner)",
      "dates": "Jun. 2012 – Jan. 2013 (8 months)"
    },
    {
      "title": "Software Engineer (Fullstack)",
      "company": "WorldSensing S.L.N.E",
      "dates": "Jul. 2010 – Jun. 2012 (2 years)"
    },
    {
      "title": "Co-founder & Software Engineer",
      "company": "Voycontigo",
      "dates": "Jul. 2009 – Feb. 2011 (1 year 8 months)"
    },
    {
      "title": "Software Developer",
      "company": "Deusto Mobile Solutions",
      "dates": "Jun. 2008 – Oct. 2008 (5 months)"
    }
  ],
  "projects": [
    {
      "title": "Traivel",
      "description": "An application that generates complete travel itineraries based on user preferences.",
      "technologies": ["HTML", "CSS", "Vue.js", "Python", "OpenAI API"]
    },
    {
      "title": "Eureka Girls",
      "description": "A game designed to introduce inspiring women in the STEM field. The goal is to match women with their achievements (available in single-player or two-player mode).",
      "technologies": ["HTML", "CSS", "React.js", "Supabase"]
    },
    {
      "title": "Landatu",
      "description": "An IoT system for sensing and monitoring vegetable gardens.",
      "technologies": ["Arduino", "Raspberry", "C", "Python", "SQL", "HTML", "CSS", "JS"]
    },
    {
      "title": "Ikasi",
      "description": "A game to learn words and numbers in Basque (Euskara).",
      "technologies": ["HTML", "JS", "CSS"]
    },
    {
      "title": "PadelCount",
      "description": "An application to track and analyze statistics of padel matches.",
      "technologies": ["HTML", "CSS", "Vue.js"]
    },
    {
      "title": "Que me pongo",
      "description": "An application that shows the weather forecast and suggests what to wear.",
      "technologies": ["HTML", "CSS", "React.js", "Weather API", "Geolocation API"]
    }
  ],
  "awards": [
    {
      "title": "Winner of Creatividad award",
      "organization": "Alava Emprende",
      "year": "2015"
    },
    {
      "title": "Winner of Yuzz Álava",
      "organization": "CISE",
      "year": "2015"
    },
    {
      "title": "Top 10 proyectos en Startup4Cities",
      "organization": "Smart City Expo World Congress",
      "year": "2015"
    }
  ],
  "talks": [
    {
      "title": "Inteligencia Artificial al servicio de los desarrolladores",
      "date": "Apr 2023",
      "description": "DataBeers"
    },
    {
      "title": "Construye una aplicación web con Django en 15 minutos",
      "date": "Dec 2020",
      "description": "PyDay Chile"
    },
    {
      "title": "Fututo tecnológico de las ciudades inteligentes",
      "date": "Nov 2013",
      "description": "Jornadas de Investigación en Ciencias de la Computación"
    }
  ],
  "books": [
    {
      "title": "Aprende Python de cero a experto",
      "platform": "LeanPub",
      "readers": "6.6K readers",
      "date": "Oct 2019"
    },
    {
      "title": "Aprende Laravel 6: guía práctica paso a paso",
      "platform": "Self-published",
      "readers": "370 readers",
      "date": "Jan 2019"
    }
  ],
  "learning": [
    {
      "title": "Curso de PHP",
      "type": "course",
      "description": "From basic syntax to advanced concepts like dependency management, OOP, data access and template engines."
    },
    {
      "title": "Building Accessible Web Applications",
      "type": "article",
      "description": "Learn how to build web applications that are accessible to everyone, including people with disabilities."
    },
    {
      "title": "JavaScript: The Hard Parts",
      "type": "video",
      "description": "A deep dive into JavaScript fundamentals including closures, prototypal inheritance, and async programming."
    },
    {
      "title": "System Design for Frontend Engineers",
      "type": "article",
      "description": "Learn how to approach system design problems from a frontend perspective."
    },
    {
      "title": "Performance Optimization Techniques",
      "type": "course",
      "description": "A comprehensive course on optimizing web applications for better performance."
    }
  ],
  "contact": {
    "links": {
      "email": {
        "display": "hello@example.com"
      },
      "twitter": {
        "display": "@developerhandle"
      },
      "linkedin": {
        "display": "Connect with me"
      },
      "github": {
        "display": "View my code"
      }
    }
  }
};

// Load content data
async function loadContentData() {
  // Content is now embedded, no need to fetch
  console.log('Content data loaded successfully');
}

function printLine(text, className = '') {
  const div = document.createElement('div');
  div.className = `line ${className}`;
  div.textContent = text;
  terminalBody.insertBefore(div, terminalInput.parentElement);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function formatExperience(data) {
  if (!data.experience) return ['No experience data found'];
  return data.experience.map(exp => 
    `- ${exp.title} at ${exp.company} (${exp.dates})`
  );
}

function formatProjects(data) {
  if (!data.projects) return ['No projects data found'];
  return data.projects.map(project => 
    `- ${project.title}: ${project.description}`
  );
}

function formatTalks(data) {
  if (!data.talks) return ['No talks data found'];
  return data.talks.map(talk => 
    `- ${talk.title} (${talk.description}, ${talk.date})`
  );
}

function formatBooks(data) {
  if (!data.books) return ['No books data found'];
  return data.books.map(book => 
    `- ${book.title} (${book.platform}, ${book.readers}, ${book.date})`
  );
}

function formatAwards(data) {
  if (!data.awards) return ['No awards data found'];
  return data.awards.map(award => 
    `- ${award.title} (${award.organization}, ${award.year})`
  );
}

function formatLearning(data) {
  if (!data.learning) return ['No learning data found'];
  return data.learning.map(item => 
    `- ${item.title} (${item.type}): ${item.description}`
  );
}

function formatAbout(data) {
  if (!data.personal || !data.personal.description) return ['No about data found'];
  return data.personal.description;
}

function formatContact(data) {
  if (!data.contact || !data.contact.links) return ['No contact data found'];
  const links = data.contact.links;
  return [
    `- Email: ${links.email.display}`,
    `- Twitter: ${links.twitter.display}`,
    `- LinkedIn: ${links.linkedin.display}`,
    `- GitHub: ${links.github.display}`
  ];
}

function formatTechnologies(data) {
  if (!data.personal || !data.personal.technologies) return ['No technologies data found'];
  return data.personal.technologies.map(tech => `- ${tech}`);
}

function runCommand(cmd) {
  const prompt = document.createElement('div');
  prompt.className = 'line';
  prompt.innerHTML = '<span class="prompt">guest@jon-vadillo-portfolio:~$</span> ' + cmd;
  terminalBody.insertBefore(prompt, terminalInput.parentElement);

  const [command, ...args] = cmd.trim().split(' ');
  const arg = args.join(' ');

  switch(command.toLowerCase()) {
    case 'help':
      printLine('Available commands:', 'command-output');
      printLine('  ls [section]      - List contents of a section');
      printLine('  cat [section]     - Display detailed info about a section');
      printLine('  pwd              - Show current directory');
      printLine('  whoami           - Display user info');
      printLine('  clear            - Clear terminal');
      printLine('  exit             - Close terminal');
      printLine('');
      printLine('Available sections:', 'success-output');
      printLine('  experience, projects, talks, books, awards, learning, about, contact, technologies');
      break;
    
    case 'ls':
      if (!arg) {
        printLine('Available sections:', 'command-output');
        printLine('experience  projects  talks  books  awards  learning  about  contact  technologies');
        break;
      }
      
      let items = [];
      switch(arg.toLowerCase()) {
        case 'experience':
          items = formatExperience(contentData);
          break;
        case 'projects':
          items = formatProjects(contentData);
          break;
        case 'talks':
          items = formatTalks(contentData);
          break;
        case 'books':
          items = formatBooks(contentData);
          break;
        case 'awards':
          items = formatAwards(contentData);
          break;
        case 'learning':
          items = formatLearning(contentData);
          break;
        case 'about':
          items = formatAbout(contentData);
          break;
        case 'contact':
          items = formatContact(contentData);
          break;
        case 'technologies':
          items = formatTechnologies(contentData);
          break;
        default:
          printLine(`ls: cannot access '${arg}': No such section`, 'error-output');
          return;
      }
      items.forEach(item => printLine(item, 'command-output'));
      break;
    
    case 'cat':
      if (!arg) {
        printLine('cat: missing section name', 'error-output');
        printLine('Usage: cat [section]', 'command-output');
        break;
      }
      
      let content = [];
      switch(arg.toLowerCase()) {
        case 'experience':
          content = formatExperience(contentData);
          break;
        case 'projects':
          content = formatProjects(contentData);
          break;
        case 'talks':
          content = formatTalks(contentData);
          break;
        case 'books':
          content = formatBooks(contentData);
          break;
        case 'awards':
          content = formatAwards(contentData);
          break;
        case 'learning':
          content = formatLearning(contentData);
          break;
        case 'about':
          content = formatAbout(contentData);
          break;
        case 'contact':
          content = formatContact(contentData);
          break;
        case 'technologies':
          content = formatTechnologies(contentData);
          break;
        default:
          printLine(`cat: ${arg}: No such section`, 'error-output');
          return;
      }
      content.forEach(line => printLine(line));
      break;
    
    case 'pwd':
      printLine('/home/guest/jon-vadillo-portfolio', 'command-output');
      break;
    
    case 'whoami':
      printLine('guest', 'command-output');
      break;
    
    case 'clear':
      [...terminalBody.querySelectorAll('.line')].forEach(e => e.remove());
      printLine('Welcome to Jon\'s Interactive Terminal! Type "help" for available commands.');
      break;
    
    case 'exit':
      terminal.classList.add('hidden');
      toggleBtn.innerHTML = '<span class="terminal-icon">></span> Open Interactive Terminal';
      break;
    
    default:
      printLine(`command not found: ${command}`, 'error-output');
      printLine('Type "help" for available commands', 'command-output');
  }
  
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Terminal input event listeners
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim();
    if (cmd) {
      commandHistory.unshift(cmd);
      historyIndex = -1;
      runCommand(cmd);
    }
    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = -1;
      terminalInput.value = '';
    }
  }
});

// Terminal toggle functionality
toggleBtn.addEventListener('click', () => {
  terminal.classList.toggle('hidden');
  if (!terminal.classList.contains('hidden')) {
    toggleBtn.innerHTML = '<span class="terminal-icon">×</span> Close Terminal';
    terminalInput.focus();
  } else {
    toggleBtn.innerHTML = '<span class="terminal-icon">></span> Open Interactive Terminal';
  }
});

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadContentData();
});
