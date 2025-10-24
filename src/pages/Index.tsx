import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

type Character = {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatar_url: string;
};

type Game = {
  id: string;
  title: string;
  world_description: string;
  status: string;
  player_count: number;
};

type Message = {
  id: string;
  role: "user" | "game_master" | "assistant";
  content: string;
  character_name?: string;
  created_at: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"home" | "characters" | "games" | "profile" | "gameroom">("home");
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Эльдар Огненный",
      description: "Маг огня из северных земель",
      personality: "Вспыльчивый, но справедливый",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=eldar"
    }
  ]);
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      title: "Подземелья Каэра",
      world_description: "Темный фэнтезийный мир полный опасностей",
      status: "active",
      player_count: 3
    },
    {
      id: "2",
      title: "Космические странники",
      world_description: "Sci-fi приключение в далеком будущем",
      status: "active",
      player_count: 2
    }
  ]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "game_master",
      content: "Добро пожаловать в подземелья Каэра! Вы стоите у входа в древнюю пещеру. Что будете делать?",
      created_at: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [newCharacter, setNewCharacter] = useState({ name: "", description: "", personality: "" });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: newMessage,
      character_name: characters[0]?.name,
      created_at: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    setTimeout(() => {
      const gmResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "game_master",
        content: "Game Master обрабатывает ваше действие...",
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, gmResponse]);
    }, 1000);
  };

  const handleCreateCharacter = () => {
    if (!newCharacter.name.trim()) return;
    
    const character: Character = {
      id: Date.now().toString(),
      name: newCharacter.name,
      description: newCharacter.description,
      personality: newCharacter.personality,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newCharacter.name}`
    };
    
    setCharacters([...characters, character]);
    setNewCharacter({ name: "", description: "", personality: "" });
  };

  return (
    <div className="min-h-screen gradient-hero">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Dice5" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">RPG Platform</h1>
            </div>
            
            <div className="flex gap-6">
              {["home", "characters", "games", "gameroom", "profile"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {tab === "home" && "Главная"}
                  {tab === "characters" && "Персонажи"}
                  {tab === "games" && "Игры"}
                  {tab === "gameroom" && "Игровая комната"}
                  {tab === "profile" && "Профиль"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-8">
            <div className="text-center py-16 space-y-4">
              <h2 className="text-5xl font-bold text-gradient">
                Погрузись в мир приключений
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Создавай персонажей, исследуй миры и взаимодействуй с AI Game Master в реальном времени
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab("characters")}>
                  <Icon name="UserPlus" className="mr-2 h-5 w-5" />
                  Создать персонажа
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab("games")}>
                  <Icon name="Gamepad2" className="mr-2 h-5 w-5" />
                  Присоединиться к игре
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="Flame" className="h-6 w-6 text-primary" />
                Активные игры
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <Card key={game.id} className="gradient-card border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{game.title}</CardTitle>
                          <CardDescription className="mt-2">{game.world_description}</CardDescription>
                        </div>
                        <Badge variant="default" className="bg-secondary">
                          <Icon name="Users" className="h-3 w-3 mr-1" />
                          {game.player_count}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setActiveTab("gameroom")}>
                        <Icon name="LogIn" className="mr-2 h-4 w-4" />
                        Войти в игру
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "characters" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мои персонажи</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Создать персонажа
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Новый персонаж</DialogTitle>
                    <DialogDescription>Создайте своего уникального персонажа для приключений</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input
                        placeholder="Введите имя персонажа"
                        value={newCharacter.name}
                        onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                        className="bg-muted border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Описание</label>
                      <Textarea
                        placeholder="Опишите внешность и историю"
                        value={newCharacter.description}
                        onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
                        className="bg-muted border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Характер</label>
                      <Textarea
                        placeholder="Опишите характер и манеру поведения"
                        value={newCharacter.personality}
                        onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                        className="bg-muted border-border"
                      />
                    </div>
                    <Button onClick={handleCreateCharacter} className="w-full bg-primary hover:bg-primary/90">
                      Создать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card key={character.id} className="gradient-card border-border/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={character.avatar_url} />
                        <AvatarFallback>{character.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{character.name}</CardTitle>
                        <CardDescription className="mt-1">{character.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Характер:</span> {character.personality}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Edit" className="mr-1 h-3 w-3" />
                          Изменить
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Icon name="Trash2" className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "games" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Игры</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Создать игру
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="gradient-card border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Icon name="Sword" className="h-5 w-5 text-primary" />
                          {game.title}
                        </CardTitle>
                        <CardDescription className="mt-3 text-base">
                          {game.world_description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-secondary">Активна</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Users" className="h-4 w-4" />
                        <span>{game.player_count} игроков</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>Сейчас активна</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setActiveTab("gameroom")}>
                      <Icon name="Play" className="mr-2 h-4 w-4" />
                      Войти в игру
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "gameroom" && (
          <div className="max-w-6xl mx-auto">
            <Card className="gradient-card border-border/50">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Dice5" className="h-6 w-6 text-primary" />
                      Подземелья Каэра
                    </CardTitle>
                    <CardDescription className="mt-1">Game Master и 3 игрока онлайн</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-secondary">
                      <Icon name="Users" className="h-3 w-3 mr-1" />
                      3 игрока
                    </Badge>
                    <Badge className="bg-primary">В игре</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-4 h-[70vh]">
                  <div className="lg:col-span-3 flex flex-col">
                    <ScrollArea className="flex-1 p-6">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              message.role === "game_master" ? "items-start" : "items-start"
                            }`}
                          >
                            <Avatar className={`h-10 w-10 ${
                              message.role === "game_master" ? "border-2 border-accent" : "border-2 border-primary"
                            }`}>
                              <AvatarFallback>
                                {message.role === "game_master" ? "GM" : message.character_name?.[0] || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">
                                  {message.role === "game_master" ? "Game Master" : message.character_name || "Игрок"}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {message.role === "game_master" ? "Ведущий" : "Игрок"}
                                </Badge>
                              </div>
                              <p className="text-sm bg-muted/50 rounded-lg p-3 border border-border/30">
                                {message.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-border/50">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Напишите действие вашего персонажа..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="bg-muted border-border"
                        />
                        <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                          <Icon name="Send" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l border-border/50 p-4 bg-muted/20">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Users" className="h-4 w-4" />
                      Участники
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/10 border border-accent/30">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>GM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Game Master</p>
                          <p className="text-xs text-muted-foreground">Ведущий</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                      </div>
                      {characters.slice(0, 3).map((char) => (
                        <div key={char.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={char.avatar_url} />
                            <AvatarFallback>{char.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{char.name}</p>
                            <p className="text-xs text-muted-foreground">Игрок</p>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-secondary" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Профиль</CardTitle>
                <CardDescription>Управление вашим аккаунтом</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarFallback className="text-2xl">ИГ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">Игрок</h3>
                    <p className="text-muted-foreground">player@rpg.com</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Icon name="Upload" className="mr-2 h-3 w-3" />
                      Изменить аватар
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="text-center">
                      <Icon name="Users" className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{characters.length}</p>
                      <p className="text-sm text-muted-foreground">Персонажей</p>
                    </div>
                    <div className="text-center">
                      <Icon name="Gamepad2" className="h-6 w-6 mx-auto mb-2 text-secondary" />
                      <p className="text-2xl font-bold">{games.length}</p>
                      <p className="text-sm text-muted-foreground">Активных игр</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" className="mr-2 h-4 w-4" />
                    Настройки
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" className="mr-2 h-4 w-4" />
                    Уведомления
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Icon name="LogOut" className="mr-2 h-4 w-4" />
                    Выйти
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
