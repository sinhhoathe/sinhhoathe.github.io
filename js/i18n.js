/* ========================================================
   ADSHIELD WEB PLAYER - INTERNATIONALIZATION (i18n)
   Hỗ trợ 5 ngôn ngữ: EN (Mặc định), VI, ES, ZH, JA
   ======================================================== */

const translations = {
  en: {
    // Header & Meta
    page_title: "AdShield Player - Block Ads & Prevent Auto-Redirects",
    brand_badge: "Dual Shield",
    url_placeholder: "Paste website or game link here (e.g. poki.com, 2048...)",
    btn_paste: "Paste",
    btn_launch: "🚀 Safe Launch",
    lang_label: "🌐 Language:",

    // Sub-bar & Shields
    mode_label: "Protection Mode:",
    mode_sandbox: "🛡️ Sandboxed Shield (Recommended)",
    mode_sandbox_desc: "Direct execution, standard HTML5 sandbox strictly blocks all tab hijacks and auto-redirects",
    mode_proxy: "🧼 Proxy Clean (Code Filter)",
    mode_proxy_desc: "Fetches via proxy and strips intrusive ad scripts before rendering",
    shield_redirect: "Anti-Redirect Active",
    shield_popup: "Popup & New Tab Blocker",
    shield_clickjack: "Anti Click-Jacking",

    // HUD
    hud_reload: "🔄 Reload",
    hud_fullscreen: "⛶ Fullscreen",
    hud_close: "✕ Close",

    // Loading
    loading_title: "Setting up AdShield Protection...",
    loading_sub: "Isolating environment, stripping popups, and optimizing framerate",

    // Empty state & Guide
    hero_title: "Enjoy Web Games & Browsing — Zero Annoying Redirects!",
    hero_desc: "Simply paste any web game or site link below. <strong>AdShield</strong> automatically isolates the destination in a secure Sandboxed container, neutralizing unwanted redirects and eliminating mouse-trap popups.",

    launcher_box_title: "Quick Game & Website Launcher",
    launcher_box_tag: "Shield Active",
    launcher_hint: "Tip: Tap '📋 Paste', then hit '🚀 Safe Launch' to start playing without spam ads!",

    step1_badge: "STEP 1",
    step1_title: "Copy Any Link",
    step1_desc: "Copy the link of your friend's game, an HTML5 web game, or any ad-infested website.",

    step2_badge: "STEP 2",
    step2_title: "Paste into AdShield",
    step2_desc: "Paste the URL into the search bar above and click the green <strong>'Safe Launch'</strong> button.",

    step3_badge: "STEP 3",
    step3_title: "Enjoy Uninterrupted",
    step3_desc: "The game runs securely locked in its frame without spam popups or getting redirected.",

    // Features
    feat1_title: "Zero Auto-Redirects",
    feat1_desc: "Revokes top-navigation authority. Websites can never force-redirect you to gambling or spam pages.",

    feat2_title: "Block Phantom Pop-ups",
    feat2_desc: "Suppresses window.open commands whenever you click on sneaky overlay ad traps.",

    feat3_title: "Maximum Framerate & Input",
    feat3_desc: "Full support for audio, keyboard, mouse, and gamepads with 100% native performance.",

    quick_demo_label: "Try instant ad-free demo games:",
    game_2048: "🔢 2048 Game",
    game_hextris: "🔷 Hextris Puzzle",
    game_flappy: "🐥 Flappy Bird",

    // Bookmarklet
    bookmarklet_tip: "💡 Quick trick without pasting links:",
    bookmarklet_desc: "Drag this button to your browser's Bookmarks Bar: <a id='bookmarklet-drag-link' href='#' style='color: #00F0FF; font-weight: 700; text-decoration: underline; margin: 0 4px;'>🛡️ AdShield 1-Click</a>. Whenever browsing an ad-heavy site, just click it to neutralize popups on that page instantly!",
    bookmarklet_toast: "👉 Drag this button and drop it onto your browser's Bookmarks Bar!",
    bookmarklet_alert: "🛡️ AdShield: Popups blocked and ad banners hidden on this page!",

    // Legal
    legal_text: "⚖️ <strong>Terms of Service:</strong> AdShield is an independent technical utility providing environment isolation (Sandboxed Environment) to safeguard users against involuntary redirects and intrusive popups. Users retain sole legal responsibility for the content of URLs they choose to open through this utility.",

    // Warning Modal
    warn_title: "Safety Advisory Notice",
    warn_desc: "The link you entered contains keywords that may be associated with adult or age-restricted content. AdShield is intended for clean web games and safe browsing.<br><br>Do you still wish to proceed in this isolated sandbox?",
    btn_cancel: "Cancel",
    btn_proceed: "I Understand & Proceed",

    // Toasts
    toast_pasted: "📋 Link pasted from clipboard!",
    toast_paste_manual: "Please press Ctrl + V to paste the link!",
    toast_empty_url: "⚠️ Please enter or paste a valid website link!",
    toast_switch_sandbox: "Switched to: Sandboxed Shield (Smooth & Zero Redirects)",
    toast_switch_proxy: "Switched to: Proxy Clean (Source Code Sanitizer)",
    toast_active_shield: "🛡️ Shields active: Anti-Redirect & Anti-Popup locked in!",
    toast_proxy_success: "✨ Code sanitized & intrusive ad scripts stripped!",
    toast_proxy_fallback: "⚠️ Proxy busy, falling back to Sandboxed Shield...",
    toast_reloading: "🔄 Reloading...",
    toast_fullscreen_on: "⛶ Fullscreen mode active (Press ESC to exit)",
    toast_closed: "Closed."
  },

  vi: {
    page_title: "AdShield Player - Chặn Quảng Cáo & Chống Tự Động Chuyển Trang",
    brand_badge: "Bảo Vệ Kép",
    url_placeholder: "Dán link trang web hoặc game vào đây (ví dụ: poki.com, 2048...)",
    btn_paste: "Dán Link",
    btn_launch: "🚀 Mở An Toàn",
    lang_label: "🌐 Ngôn ngữ:",

    mode_label: "Chế độ:",
    mode_sandbox: "🛡️ Sandboxed Shield (Khuyên dùng)",
    mode_sandbox_desc: "Chạy trực tiếp, dùng Sandbox chuẩn HTML5 chặn tuyệt đối mọi hành vi chuyển tab / redirect",
    mode_proxy: "🧼 Proxy Clean (Lọc mã nguồn)",
    mode_proxy_desc: "Tải qua Proxy lọc sạch script quảng cáo rác trước khi hiển thị",
    shield_redirect: "Chống Auto-Redirect",
    shield_popup: "Chặn Pop-up & Tab mới",
    shield_clickjack: "Khóa Click-jacking",

    hud_reload: "🔄 Tải lại",
    hud_fullscreen: "⛶ Toàn màn hình",
    hud_close: "✕ Đóng",

    loading_title: "Đang thiết lập lá chắn bảo vệ AdShield...",
    loading_sub: "Loại bỏ popup, vô hiệu hóa redirect và tối ưu khung hình",

    hero_title: "Thoải Mái Chơi Game & Lướt Web - Không Lo Bị Nhảy Link!",
    hero_desc: "Chỉ cần dán link trang web hoặc game vào ô bên dưới, <strong>AdShield</strong> sẽ tự động cô lập trang đích trong một môi trường cát (Sandboxed Container), triệt tiêu các mã tự ý nhảy link (Redirect) và chặn đứng mọi pop-up bẫy chuột.",

    launcher_box_title: "Khởi Chạy Game & Web Nhanh",
    launcher_box_tag: "Lá Chắn Đang Bật",
    launcher_hint: "Mẹo: Bấm '📋 Dán Link', sau đó bấm '🚀 Mở An Toàn' để vào chơi ngay không bị quảng cáo làm phiền!",

    step1_badge: "BƯỚC 1",
    step1_title: "Sao Chép Liên Kết",
    step1_desc: "Copy link game của bạn bè hoặc trang web chứa nhiều quảng cáo rác.",

    step2_badge: "BƯỚC 2",
    step2_title: "Dán Vào AdShield",
    step2_desc: "Dán link vào thanh tìm kiếm ở đầu trang rồi bấm nút <strong>'Mở An Toàn'</strong> màu xanh.",

    step3_badge: "BƯỚC 3",
    step3_title: "Tận Hưởng Trải Nghiệm",
    step3_desc: "Game được khóa cứng trong khung, không còn quảng cáo giật giũa hay bị văng sang trang khác.",

    feat1_title: "Chặn Tuyệt Đối Redirect",
    feat1_desc: "Vô hiệu hóa quyền cướp tab (top-navigation). Trang web không thể tự ý chuyển hướng bạn sang trang cờ bạc, shopee...",

    feat2_title: "Ngăn Pop-up & Tab Ma",
    feat2_desc: "Chặn lệnh mở tab ngầm (window.open) mỗi khi bạn vô tình bấm nhầm vào các nút bẫy trên màn hình.",

    feat3_title: "Tốc Độ Khung Hình Tối Đa",
    feat3_desc: "Giữ trọn vẹn âm thanh, điều khiển phím, chuột và tay cầm với hiệu năng mượt mà 100%.",

    quick_demo_label: "Trải nghiệm thử ngay:",
    game_2048: "🔢 Game 2048",
    game_hextris: "🔷 Hextris Xếp Hình",
    game_flappy: "🐥 Flappy Bird",

    bookmarklet_tip: "💡 Mẹo nhanh không cần dán link:",
    bookmarklet_desc: "Bạn kéo nút này thả lên thanh Dấu trang (Bookmark Bar) của trình duyệt: <a id='bookmarklet-drag-link' href='#' style='color: #00F0FF; font-weight: 700; text-decoration: underline; margin: 0 4px;'>🛡️ AdShield 1-Click</a>. Mỗi khi đang ở bất kỳ trang web nào bị nhảy popup làm phiền, chỉ cần bấm nút này trên thanh Bookmark để triệt tiêu popup ngay lập tức!",
    bookmarklet_toast: "👉 Hãy kéo nút này thả vào thanh Dấu trang (Bookmark Bar) của trình duyệt nhé!",
    bookmarklet_alert: "🛡️ AdShield: Đã chặn pop-up và ẩn banner quảng cáo trên trang này!",

    legal_text: "⚖️ <strong>Điều khoản dịch vụ:</strong> AdShield là công cụ kỹ thuật độc lập hỗ trợ cách ly môi trường web (Sandboxed Environment) nhằm bảo vệ người dùng trước các đoạn mã chuyển hướng ngoài ý muốn và cửa sổ bật lên độc hại. Người dùng tự chịu trách nhiệm pháp lý đối với nội dung của các trang web được yêu cầu mở thông qua công cụ.",

    warn_title: "Cảnh Báo An Toàn Liên Kết",
    warn_desc: "Liên kết bạn vừa nhập có chứa từ khóa có thể liên quan đến nội dung người lớn hoặc cờ bạc bị hạn chế. AdShield được thiết kế cho mục đích chặn quảng cáo trang web và game an toàn.<br><br>Bạn có chắc chắn muốn tiếp tục mở trang này trong khung cách ly không?",
    btn_cancel: "Hủy Bỏ",
    btn_proceed: "Tôi Hiểu Rủi Ro & Mở Tiếp",

    toast_pasted: "📋 Đã dán link vào ô tìm kiếm!",
    toast_paste_manual: "Vui lòng bấm Ctrl + V để dán link vào ô nhé!",
    toast_empty_url: "⚠️ Vui lòng nhập hoặc dán liên kết trang web!",
    toast_switch_sandbox: "Chuyển sang: Lá Chắn Sandboxed (Mượt & Chặn Redirect)",
    toast_switch_proxy: "Chuyển sang: Lọc Sạch Mã Nguồn (Proxy Clean)",
    toast_active_shield: "🛡️ Đã kích hoạt lá chắn: Chống Redirect & Khóa Pop-up!",
    toast_proxy_success: "✨ Đã lọc sạch mã quảng cáo qua bộ lọc Proxy!",
    toast_proxy_fallback: "⚠️ Proxy quá tải, đang chuyển sang Sandboxed Shield...",
    toast_reloading: "🔄 Đang tải lại...",
    toast_fullscreen_on: "⛶ Đã bật toàn màn hình (Bấm ESC để thoát)",
    toast_closed: "Đã đóng trang."
  },

  es: {
    page_title: "AdShield Player - Bloquea Anuncios y Evita Redirecciones",
    brand_badge: "Escudo Dual",
    url_placeholder: "Pega el enlace del juego o web aquí (ej. poki.com, 2048...)",
    btn_paste: "Pegar",
    btn_launch: "🚀 Abrir Seguro",
    lang_label: "🌐 Idioma:",

    mode_label: "Modo de Protección:",
    mode_sandbox: "🛡️ Sandbox Shield (Recomendado)",
    mode_sandbox_desc: "Ejecución directa, sandbox HTML5 bloquea redirecciones automáticas",
    mode_proxy: "🧼 Proxy Limpio (Filtro de Código)",
    mode_proxy_desc: "Descarga mediante proxy y elimina scripts de anuncios molestos",
    shield_redirect: "Anti-Redirección Activo",
    shield_popup: "Bloqueador de Pop-ups",
    shield_clickjack: "Anti Click-Jacking",

    hud_reload: "🔄 Recargar",
    hud_fullscreen: "⛶ Pantalla Completa",
    hud_close: "✕ Cerrar",

    loading_title: "Configurando la protección AdShield...",
    loading_sub: "Aislando el entorno y eliminando popups molestos",

    hero_title: "Disfruta de Juegos Web sin Molestas Redirecciones",
    hero_desc: "Pega cualquier enlace arriba. <strong>AdShield</strong> aísla automáticamente el destino en un contenedor Sandboxed seguro, neutralizando redirecciones y molestos popups.",

    step1_badge: "PASO 1",
    step1_title: "Copia Cualquier Enlace",
    step1_desc: "Copia el enlace del juego de tu amigo o de sitios web con anuncios invasivos.",

    step2_badge: "PASO 2",
    step2_title: "Pega en AdShield",
    step2_desc: "Pega la URL en la barra superior y pulsa el botón verde <strong>'Abrir Seguro'</strong>.",

    step3_badge: "PASO 3",
    step3_title: "Juega sin Interrupciones",
    step3_desc: "El juego se ejecuta bloqueado sin pestañas emergentes ni saltos de página.",

    feat1_title: "Cero Redirecciones",
    feat1_desc: "Elimina la autoridad de navegación superior. Las webs no pueden redirigirte a la fuerza.",

    feat2_title: "Bloqueo de Pop-ups",
    feat2_desc: "Suprime los comandos window.open al hacer clic en trampas publicitarias.",

    feat3_title: "Máximo Rendimiento",
    feat3_desc: "Compatibilidad total con audio, teclado, ratón y mandos con fluidez al 100%.",

    quick_demo_label: "Prueba juegos de demostración:",
    game_2048: "🔢 Juego 2048",
    game_hextris: "🔷 Hextris Puzzle",
    game_flappy: "🐥 Flappy Bird",

    bookmarklet_tip: "💡 Truco rápido sin pegar enlaces:",
    bookmarklet_desc: "Arrastra este botón a la barra de marcadores: <a id='bookmarklet-drag-link' href='#' style='color: #00F0FF; font-weight: 700; text-decoration: underline; margin: 0 4px;'>🛡️ AdShield 1-Click</a>. ¡Haz clic para neutralizar popups en cualquier página!",
    bookmarklet_toast: "👉 ¡Arrastra este botón a tu barra de marcadores!",
    bookmarklet_alert: "🛡️ AdShield: ¡Popups bloqueados y banners ocultos en esta página!",

    legal_text: "⚖️ <strong>Términos de servicio:</strong> AdShield es una herramienta técnica independiente para el aislamiento de entornos web. Los usuarios son los únicos responsables del contenido al que acceden.",

    warn_title: "Aviso de Seguridad",
    warn_desc: "El enlace contiene palabras clave asociadas con contenido restringido para adultos. AdShield está diseñado para juegos y navegación limpia.<br><br>¿Deseas continuar en este sandbox aislado?",
    btn_cancel: "Cancelar",
    btn_proceed: "Entiendo los riesgos y continuar",

    toast_pasted: "📋 ¡Enlace pegado!",
    toast_paste_manual: "¡Presiona Ctrl + V para pegar el enlace!",
    toast_empty_url: "⚠️ ¡Por favor ingresa un enlace válido!",
    toast_switch_sandbox: "Cambiado a: Sandbox Shield",
    toast_switch_proxy: "Cambiado a: Proxy Limpio",
    toast_active_shield: "🛡️ ¡Escudo activado: Anti-Redirección y Anti-Popup!",
    toast_proxy_success: "✨ ¡Código saneado con éxito!",
    toast_proxy_fallback: "⚠️ Proxy ocupado, cambiando a Sandbox Shield...",
    toast_reloading: "🔄 Recargando...",
    toast_fullscreen_on: "⛶ Pantalla completa activada (Pulsa ESC para salir)",
    toast_closed: "Cerrado."
  },

  zh: {
    page_title: "AdShield Player - 拦截广告与防止自动跳转",
    brand_badge: "双重防护",
    url_placeholder: "在此粘贴网站或游戏链接（如 poki.com, 2048...）",
    btn_paste: "粘贴",
    btn_launch: "🚀 安全打开",
    lang_label: "🌐 语言:",

    mode_label: "防护模式:",
    mode_sandbox: "🛡️ 沙盒防护（推荐）",
    mode_sandbox_desc: "直接运行，标准HTML5沙盒严格禁止所有标签劫持和自动重定向",
    mode_proxy: "🧼 代理净化（代码过滤）",
    mode_proxy_desc: "通过代理获取并剥离侵入式广告脚本",
    shield_redirect: "防自动重定向",
    shield_popup: "弹窗与新标签拦截",
    shield_clickjack: "防点击劫持",

    hud_reload: "🔄 刷新",
    hud_fullscreen: "⛶ 全屏",
    hud_close: "✕ 关闭",

    loading_title: "正在启动 AdShield 保护...",
    loading_sub: "隔离运行环境，消除弹窗并优化帧率",

    hero_title: "畅享网页游戏与浏览 — 远离恶心跳转！",
    hero_desc: "只需在上方粘贴游戏或网站链接，<strong>AdShield</strong> 会自动将其隔离在安全沙盒容器中，彻底消除恶意自动跳转并拦截欺诈性弹窗。",

    step1_badge: "第一步",
    step1_title: "复制任意链接",
    step1_desc: "复制好友的游戏链接或充满牛皮癣广告的网页地址。",

    step2_badge: "第二步",
    step2_title: "粘贴到 AdShield",
    step2_desc: "将网址粘贴到搜索框中，然后点击绿色的 <strong>'安全打开'</strong> 按钮。",

    step3_badge: "第三步",
    step3_title: "尽享纯净体验",
    step3_desc: "游戏被安全锁定在框架内，不会出现弹窗广告或被迫跳转。",

    feat1_title: "绝无自动跳转",
    feat1_desc: "剥夺顶层导航权限，网站永远无法强行将您跳转至博彩或流氓页面。",

    feat2_title: "杜绝隐形弹窗",
    feat2_desc: "拦截点击广告陷阱时触发的 window.open 命令。",

    feat3_title: "满血帧率与操控",
    feat3_desc: "完整支持音频、键盘、鼠标与手柄输入，100%原生性能。",

    quick_demo_label: "即刻体验纯净免广告演示游戏：",
    game_2048: "🔢 2048数字游戏",
    game_hextris: "🔷 六角消除",
    game_flappy: "🐥 像素鸟",

    bookmarklet_tip: "💡 免粘贴快速小技巧：",
    bookmarklet_desc: "将此按钮拖动到浏览器的书签栏：<a id='bookmarklet-drag-link' href='#' style='color: #00F0FF; font-weight: 700; text-decoration: underline; margin: 0 4px;'>🛡️ AdShield 一键拦截</a>。在浏览多广告网页时，只需点击它即可立即消灭弹窗！",
    bookmarklet_toast: "👉 请将此按钮拖拽至浏览器的书签栏！",
    bookmarklet_alert: "🛡️ AdShield：已屏蔽本页面的弹窗并隐藏横幅广告！",

    legal_text: "⚖️ <strong>服务条款：</strong> AdShield 是一项提供沙盒隔离环境的独立技术工具，旨在保护用户免受非自愿重定向和弹窗困扰。用户对其打开的链接内容承担全部法律责任。",

    warn_title: "安全提示",
    warn_desc: "您输入的链接包含可能与成人或受限内容相关的关键字。AdShield 旨在提供纯净网页游戏体验。<br><br>您确定要在隔离沙盒中继续打开吗？",
    btn_cancel: "取消",
    btn_proceed: "我了解风险并继续",

    toast_pasted: "📋 已从剪贴板粘贴链接！",
    toast_paste_manual: "请按 Ctrl + V 粘贴链接！",
    toast_empty_url: "⚠️ 请输入有效的网页链接！",
    toast_switch_sandbox: "已切换至：沙盒防护模式",
    toast_switch_proxy: "已切换至：代理净化模式",
    toast_active_shield: "🛡️ 防护已就位：锁定防跳转与防弹窗！",
    toast_proxy_success: "✨ 代码净化完成，广告脚本已清除！",
    toast_proxy_fallback: "⚠️ 代理繁忙，正在回退至沙盒防护...",
    toast_reloading: "🔄 正在重新加载...",
    toast_fullscreen_on: "⛶ 已开启全屏（按 ESC 键退出）",
    toast_closed: "已关闭。"
  },

  ja: {
    page_title: "AdShield Player - 広告ブロック＆自動リダイレクト防止",
    brand_badge: "デュアル保護",
    url_placeholder: "ウェブサイトやゲームのURLを貼り付け（例: poki.com, 2048...）",
    btn_paste: "貼付",
    btn_launch: "🚀 安全に開く",
    lang_label: "🌐 言語:",

    mode_label: "保護モード:",
    mode_sandbox: "🛡️ サンドボックス保護（推奨）",
    mode_sandbox_desc: "直接実行、標準HTML5サンドボックスがタブ乗っ取りや自動リダイレクトを完全に遮断",
    mode_proxy: "🧼 プロキシーコード浄化",
    mode_proxy_desc: "プロキシ経由で取得し、迷惑な広告スクリプトを除去",
    shield_redirect: "自動リダイレクト防止",
    shield_popup: "ポップアップ遮断",
    shield_clickjack: "クリックジャック防止",

    hud_reload: "🔄 再読込",
    hud_fullscreen: "⛶ 全画面",
    hud_close: "✕ 閉じる",

    loading_title: "AdShield保護を設定中...",
    loading_sub: "環境を分離し、ポップアップを排除してフレームレートを最適化",

    hero_title: "迷惑なリダイレクトなしでウェブゲームを快適に！",
    hero_desc: "リンクを貼り付けるだけで、<strong>AdShield</strong>が安全なサンドボックスに隔離し、悪質なリダイレクトや罠ポップアップを無力化します。",

    step1_badge: "ステップ 1",
    step1_title: "リンクをコピー",
    step1_desc: "友達のゲームや広告だらけのサイトのURLをコピーします。",

    step2_badge: "ステップ 2",
    step2_title: "AdShield に貼り付け",
    step2_desc: "上のバーにURLを貼り付け、緑色の<strong>「安全に開く」</strong>ボタンをクリックします。",

    step3_badge: "ステップ 3",
    step3_title: "快適にプレイ",
    step3_desc: "ポップアップや画面遷移なしでゲームをお楽しみいただけます。",

    feat1_title: "リダイレクト完全ゼロ",
    feat1_desc: "上位ナビゲーション権限を無効化。不審なサイトへ強制遷移される心配はありません。",

    feat2_title: "幽霊ポップアップ阻止",
    feat2_desc: "広告トラップをクリックした際のwindow.open命令を無力化します。",

    feat3_title: "最高フレームレート",
    feat3_desc: "オーディオ、キーボード、マウス、ゲームパッドに完全対応し、100%のスムーズさを維持します。",

    quick_demo_label: "広告なしのデモゲームを試す:",
    game_2048: "🔢 2048パズル",
    game_hextris: "🔷 ヘックストリス",
    game_flappy: "🐥 フロッピーバード",

    bookmarklet_tip: "💡 リンク貼り付け不要の便利ワザ:",
    bookmarklet_desc: "このボタンをブックマークバーにドラッグ: <a id='bookmarklet-drag-link' href='#' style='color: #00F0FF; font-weight: 700; text-decoration: underline; margin: 0 4px;'>🛡️ AdShield 1-Click</a>。広告だらけのサイトでクリックするだけでポップアップを瞬時に阻止！",
    bookmarklet_toast: "👉 このボタンをブラウザのブックマークバーにドラッグ＆ドロップしてください！",
    bookmarklet_alert: "🛡️ AdShield: ポップアップを遮断し、広告バナーを非表示にしました！",

    legal_text: "⚖️ <strong>利用規約:</strong> AdShieldは、不本意なリダイレクトや迷惑ポップアップから保護するための環境分離技術ツールです。利用者はアクセスするコンテンツに対して全責任を負うものとします。",

    warn_title: "安全上のご注意",
    warn_desc: "入力されたURLには成人向けまたは制限されたコンテンツに関連するキーワードが含まれています。AdShieldは安全なウェブゲームプレイを目的としています。<br><br>隔離されたサンドボックスで続行しますか？",
    btn_cancel: "キャンセル",
    btn_proceed: "リスクを承諾して続行",

    toast_pasted: "📋 クリップボードからリンクを貼り付けました！",
    toast_paste_manual: "Ctrl + V を押して貼り付けてください！",
    toast_empty_url: "⚠️ 有効なウェブサイトのリンクを入力してください！",
    toast_switch_sandbox: "切り替え: サンドボックス保護モード",
    toast_switch_proxy: "切り替え: プロキシー浄化モード",
    toast_active_shield: "🛡️ シールド発動: リダイレクト＆ポップアップを完全ブロック！",
    toast_proxy_success: "✨ コードが浄化され、広告スクリプトが除去されました！",
    toast_proxy_fallback: "⚠️ プロキシ混雑のため、サンドボックス保護にフォールバックします...",
    toast_reloading: "🔄 再読み込み中...",
    toast_fullscreen_on: "⛶ 全画面モード（ESCキーで終了）",
    toast_closed: "閉じました。"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('adshield_lang') || 'en'; // Mặc định là Tiếng Anh
  }

  setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('adshield_lang', lang);
    this.applyTranslations();
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  applyTranslations() {
    document.title = this.t('page_title');
    document.documentElement.lang = this.currentLang;

    // Quét tất cả các phần tử có data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = this.t(key);
      if (text) el.innerHTML = text;
    });

    // Quét các phần tử có placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = this.t(key);
      if (text) el.placeholder = text;
    });

    // Quét các phần tử có title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const text = this.t(key);
      if (text) el.title = text;
    });

    // Cập nhật select dropdown
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = this.currentLang;
  }
}

window.i18n = new I18nManager();
