export function localize(project, lang) {
  return { ...project, ...project.content[lang] }
}

export const projects = [
  {
    slug: 'portfolio',
    type: 'frontend',
    cover: '/projects/portfolio/logoport.png',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Vite'],
    links: {
      site: 'https://jpmattos.vercel.app/',
      github: 'https://github.com/joaomattos07/portfolio',
    },
    content: {
      pt: {
        title: 'Portfólio',
        summary:
          'Desenvolvi meu portfólio pessoal utilizando React, JavaScript, Tailwind CSS e Vite, com deploy realizado na Vercel. A aplicação possui interface responsiva e suporte bilíngue (PT/EN) para apresentar meus projetos e habilidades.',
        sections: [
          {
            title: 'Dados e rotas',
            text: 'Os dados dos projetos ficam em uma única estrutura. O React Router identifica cada projeto pelo slug e abre sua página de detalhes, reutilizando os mesmos dados da listagem.',
          },
          {
            title: 'Conteúdo bilíngue',
            text: 'Organizei os textos em português e inglês e conectei a escolha de idioma a um contexto compartilhado. A navegação e o conteúdo dos projetos acompanham o idioma selecionado.',
          },
          {
            title: 'Componentes e responsividade',
            text: 'Separei a interface em componentes React, como navegação e cards de projeto. Com Tailwind CSS, adaptei os layouts para reorganizar o conteúdo em telas menores.',
          },
        ],
      },
      en: {
        title: 'Portfolio',
        summary:
          'I developed my personal portfolio using React, JavaScript, Tailwind CSS, and Vite, and deployed it on Vercel. The application features a responsive interface and bilingual support (PT/EN) to showcase my projects and skills.',
        sections: [
          {
            title: 'Data and routes',
            text: 'Project data lives in a single structure. React Router uses each project’s slug to open its detail page, reusing the same data shown in the project list.',
          },
          {
            title: 'Bilingual content',
            text: 'I organized the content in Portuguese and English and connected the language choice to a shared context. The navigation and project content follow the selected language.',
          },
          {
            title: 'Components and responsiveness',
            text: 'I split the interface into React components, including the navigation and project cards. With Tailwind CSS, I adapted the layouts to rearrange content on smaller screens.',
          },
        ],
      },
    },
  },
  {
    slug: 'prismapay',
    type: 'uiux',
    tags: ['Figma', 'FigJam', 'UI/UX', 'User Flow', 'Mobile-first', 'Prototypes'],
    cover: '/projects/prismapay/capa.png',
    flowImage: '/projects/prismapay/prisma-flow-clean.png',
    links: {
      prototype:
        'https://www.figma.com/proto/GfJsKUTtYONqlVgVpzq7Ll/PrismaApp?node-id=15-288&p=f&viewport=433%2C439%2C0.17&t=RtYgBvUtrFF4tjIS-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=312%3A437&page-id=0%3A1',
    },
    content: {
      pt: {
        title: 'PrismaPay',
        summary:
          'O PrismaPay é um projeto de aplicativo mobile pensado para reunir, em uma única tela inicial, o saldo total, as contas e os cartões de diferentes bancos. A proposta inclui fluxos de boas-vindas, cadastro e login, além da navegação entre as áreas Home, Cartão, Pix e Cofres. Mapeei o fluxo completo no FigJam e prototipei as telas no Figma, buscando tornar a consulta das finanças mais clara e prática.',
        detailIntro:
          'O PrismaPay é um conceito de app financeiro mobile que reúne contas e cartões de diferentes bancos em uma única experiência, com protótipo no Figma e fluxo mapeado no FigJam.',
        problemTitle: 'O desafio',
        problem:
          'Criar uma experiência mobile que reunisse contas e cartões de diferentes bancos sem deixar a tela inicial confusa. O desafio era mostrar o saldo total com clareza e manter cada instituição reconhecível, com acesso fácil às principais ações.',
        flowImageAlt:
          'Fluxograma do PrismaPay com acesso, login e cadastro, recuperação de senha, Home e áreas principais do app.',
        flowImageCaption:
          'Fluxo de acesso, navegação e principais ações do PrismaPay mapeado no FigJam. Clique na imagem para ampliar.',
        sections: [
          {
            title: 'Como organizei a experiência',
            text: 'A Home reúne o saldo total e as contas e cartões em um só lugar. Mantive Home, Cartão, Pix e Cofres na navegação inferior para deixar as áreas principais sempre acessíveis. Nas telas de cartão, as cores ajudam a diferenciar cada instituição.',
          },
          {
            title: 'Tela de cartões',
            text: 'A tela concentra o cartão ativo, opções para adicionar ou remover cartões e alterar o PIN, além de indicadores de uso mensal e total.',
            image: '/projects/prismapay/prismapay-card-hand.png',
            imageAlt:
              'Tela de gerenciamento de cartões do PrismaPay exibida em um celular segurado por uma mão.',
          },
          {
            title: 'Fluxo do usuário',
            text: 'Mapeei no FigJam a jornada desde as boas-vindas até a Home, com caminhos para cadastro, login e recuperação de senha. A partir da Home, o fluxo se ramifica para as áreas principais e ações do app, como Pix, cartões e Cofres.',
          },
        ],
      },
      en: {
        title: 'PrismaPay',
        summary:
          'PrismaPay is a mobile app concept designed to bring the total balance, accounts, and cards from different banks together on a single home screen. The project includes welcome, sign-up, and sign-in flows, as well as navigation between the Home, Cards, Pix, and Savings sections. I mapped the complete user flow in FigJam and prototyped the screens in Figma, aiming to make financial information clearer and easier to navigate.',
        detailIntro:
          'PrismaPay is a mobile finance app concept that brings accounts and cards from different banks into one experience, with a Figma prototype and a user flow mapped in FigJam.',
        problemTitle: 'The challenge',
        problem:
          'Create a mobile experience that brings accounts and cards from different banks together without making the home screen feel cluttered. The challenge was to present the total balance clearly, keep each institution recognizable, and make key actions easy to reach.',
        flowImageAlt:
          'PrismaPay flowchart showing access, sign-in and sign-up, password recovery, Home, and the app’s main areas.',
        flowImageCaption:
          'PrismaPay access, navigation, and key actions mapped in FigJam. Click the image to enlarge it.',
        sections: [
          {
            title: 'How I organized the experience',
            text: 'The Home screen brings the total balance, accounts, and cards together. I kept Home, Card, Pix, and Savings in the bottom navigation so the main areas stay within easy reach. Each card screen uses color to distinguish its bank.',
          },
          {
            title: 'Card screen',
            text: 'This screen brings together the active card, options to add or remove cards and change the PIN, plus monthly and total usage indicators.',
            image: '/projects/prismapay/prismapay-card-hand.png',
            imageAlt:
              'PrismaPay card management screen shown on a phone held in a hand.',
          },
          {
            title: 'User flow',
            text: 'I mapped the journey in FigJam from the welcome screen to Home, including sign-up, sign-in, and password recovery. From Home, the flow branches into the app’s main areas and actions, including Pix, cards, and savings.',
          },
        ],
      },
    },
  },
]
