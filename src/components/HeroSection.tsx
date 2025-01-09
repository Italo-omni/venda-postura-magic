import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega a API do YouTube quando o componente for montado
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup para remover o script após o componente ser desmontado
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Esta função será chamada assim que a API estiver carregada
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("video-player", {
        videoId: "j01yGLRxKNY",  // ID do vídeo
        playerVars: {
          autoplay: 1,          // Inicia o vídeo automaticamente
          mute: 1,              // Mute o áudio
          loop: 1,              // Loop infinito
          playlist: "j01yGLRxKNY", // Para o loop funcionar
          controls: 0,          // Remove os controles
          showinfo: 0,          // Remove o título e o canal
          rel: 0,               // Remove vídeos relacionados no final
          modestbranding: 1,    // Remove o logo do YouTube
          fs: 0,                // Desabilita o botão de tela cheia
          iv_load_policy: 3,    // Remove anotações
          autohide: 1,          // Esconde os controles automaticamente
          cc_load_policy: 0,    // Desabilita legendas automáticas
          playsinline: 1        // Reproduz inline em dispositivos móveis
        },
        events: {
          onReady: (event) => {
            event.target.playVideo(); // Inicia o vídeo quando o player estiver pronto
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative bg-secondary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transforme sua Postura e Viva sem Dores
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              A almofada ergonômica que o Brasil ama, ideal para escritório, casa ou viagens.
              Suporte perfeito para quadril e lombar.
            </p>
            <button 
              onClick={() => navigate("/checkout")}
              className="cta-button inline-flex items-center gap-2">
              Peça Agora e Transforme Sua Postura! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            {/* O container do player será preenchido com o vídeo via YouTube Iframe API */}
            <div id="video-player"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
