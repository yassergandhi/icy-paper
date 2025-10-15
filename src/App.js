// src/GermanLearningPlatform.jsx
import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  Check,
  BookOpen,
  MessageCircle,
  Award,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trash2,
  Save,
  Eye,
  Zap,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

/**
 * Requisitos:
 * - Variables de entorno:
 *    REACT_APP_SUPABASE_URL
 *    REACT_APP_SUPABASE_ANON_KEY
 *
 * - Dependencias: @supabase/supabase-js, lucide-react, TailwindCSS
 */

// Inicializa Supabase (usa vars de entorno, no incluyas claves en el código)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function GermanLearningPlatform() {
  // UI state
  const [expandedSections, setExpandedSections] = useState({});
  const [completedActivities, setCompletedActivities] = useState({});
  const [showHints, setShowHints] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({}); // feedback inmediato por campo
  const [showSolution, setShowSolution] = useState({});
  // User info (required)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [savingStatus, setSavingStatus] = useState({}); // per activity saving state

  // Toggle helpers
  const toggleSection = (id) =>
    setExpandedSections((p) => ({ ...p, [id]: !p[id] }));
  const toggleHint = (id) => setShowHints((p) => ({ ...p, [id]: !p[id] }));
  const toggleSolution = (id) =>
    setShowSolution((p) => ({ ...p, [id]: !p[id] }));
  const markComplete = (id) =>
    setCompletedActivities((p) => ({ ...p, [id]: !p[id] }));

  // -------------------------
  // Validaciones del usuario
  useEffect(() => {
    const trimmed = fullName.trim();
    setNameValid(trimmed.split(" ").filter(Boolean).length >= 2); // al menos nombre y apellido
  }, [fullName]);

  useEffect(() => {
    const match = /^[a-zA-Z0-9._%+-]+@azc\.uam\.mx$/i.test(email.trim());
    setEmailValid(match);
  }, [email]);

  // -------------------------
  // Data (unchanged structure, trimmed for brevity)
  const resources = [
    {
      name: "leo.org",
      url: "https://www.leo.org",
      description: "Diccionario alemán-español",
    },
    {
      name: "pons.de",
      url: "https://de.pons.com",
      description: "Diccionario completo",
    },
    {
      name: "DeepL",
      url: "https://www.deepl.com/translator",
      description: "Traductor contextual",
    },
    {
      name: "dict.cc",
      url: "https://www.dict.cc",
      description: "Diccionario multilingüe",
    },
  ];

  const activities = [
    {
      id: "act1",
      title: "Actividad 1: Comprensión del Chat",
      icon: MessageCircle,
      difficulty: "Básico",
      color: "bg-blue-500",
      intro:
        "En esta actividad, vas a leer el chat entre mili y ruckzuck. Tu objetivo es encontrar información específica.",
      questions: [
        {
          q: "1. Woher kommt Sebastian?",
          hint: "Busca en el chat cuando Sebastian habla de su origen. ¿Qué ciudad menciona?",
          guidance: '¿Dónde dice Sebastian "Ich komme aus..."?',
        },
        {
          q: "2. Welche Nationalität haben Annas Eltern?",
          hint: 'Anna habla de sus padres. ¿Qué dice sobre "Mein Vater" y "Meine Mutter"?',
          guidance: 'Busca las palabras "Vater" (padre) y "Mutter" (madre)',
        },
        {
          q: "3. Was ist Annas Hobby?",
          hint: 'Anna menciona qué le gusta hacer. Busca la palabra "Hobby" o verbos de actividades.',
          guidance: "¿Qué actividad menciona Anna que le gusta hacer?",
        },
        {
          q: "4. Wie viele Tiere hat Sebastian?",
          hint: "Sebastian habla de sus mascotas (Haustiere). Cuenta cuántas menciona.",
          guidance: 'Busca palabras como "Hund" (perro) y "Katze" (gato)',
        },
        {
          q: "5. Wie heißen Annas Katzen?",
          hint: "Anna menciona los nombres de sus gatos. Son dos nombres.",
          guidance: "¿Qué nombres aparecen cuando Anna habla de sus gatos?",
        },
        {
          q: "6. Warum beendet Sebastian den Chat?",
          hint: "Al final del chat, Sebastian explica por qué tiene que irse.",
          guidance: "Busca al final: ¿qué razón da Sebastian?",
        },
      ],
      tips: [
        "No necesitas entender cada palabra. Busca las palabras clave.",
        "Usa leo.org para buscar palabras que no conoces",
        "Las respuestas deben ser cortas (Stichworten = palabras clave)",
        "Primero lee todo el chat para tener una idea general",
      ],
    },
    {
      id: "act2",
      title: "Actividad 2: Caza de Pronombres y Verbos",
      icon: BookOpen,
      difficulty: "Intermedio",
      color: "bg-green-500",
      intro:
        "Ahora vas a identificar la estructura gramatical del chat. Es como un juego de detective lingüístico 🔍",
      tasks: [
        {
          task: "Subraya todos los pronombres personales",
          examples: "Ejemplos: ich, du, er, sie, wir, ihr",
          hint: '¿Recuerdas que los pronombres son palabras como "yo", "tú", "él"? En alemán son: ich (yo), du (tú), er/sie/es (él/ella/eso), wir (nosotros), ihr (vosotros), sie/Sie (ellos/usted)',
          question: "¿Cuántos pronombres diferentes encontraste en el chat?",
        },
        {
          task: "Marca los verbos conjugados",
          examples: "Ejemplos: bin, komme, wohne, habe",
          hint: "Los verbos son palabras de acción o estado. Busca palabras que indican lo que alguien hace o es.",
          question:
            "¿Notas un patrón? ¿Qué verbo sigue después de cada pronombre?",
        },
      ],
      reflection:
        "Reflexiona: ¿Observas que cada pronombre tiene una forma verbal específica? Esto se llama CONJUGACIÓN.",
      tips: [
        "Usa diferentes colores para pronombres y verbos",
        "Escribe una lista de pronombres + verbos que encontraste",
        "Observa: ¿El verbo cambia con cada pronombre?",
      ],
    },
    {
      id: "act3",
      title: "Actividad 3: Tablas de Conjugación",
      icon: Award,
      difficulty: "Intermedio-Avanzado",
      color: "bg-purple-500",
      intro:
        "Ahora completarás las tablas de conjugación. Es como resolver un rompecabezas donde cada pieza tiene su lugar específico.",
      guidance: [
        {
          step: "PASO 1: Encuentra el verbo en el chat",
          detail: "Busca ejemplos del verbo en diferentes formas en el chat",
        },
        {
          step: "PASO 2: Identifica el patrón",
          detail: "Observa qué termina cada forma: -e, -st, -t, -en",
        },
        {
          step: "PASO 3: Completa las formas que faltan",
          detail: "Usa el patrón que descubriste",
        },
        {
          step: "PASO 4: Subraya las terminaciones",
          detail: "Esto te ayudará a memorizar el patrón",
        },
      ],
      verbos: [
        {
          verb: "kommen",
          type: "regular",
          help: "Raíz: komm- → añade las terminaciones: -e, -st, -t, -en, -t, -en",
        },
        {
          verb: "wohnen",
          type: "regular",
          help: 'Raíz: wohn- → mismo patrón que "kommen"',
        },
        {
          verb: "sein",
          type: "irregular",
          help: "¡ALERTA! Este verbo es irregular. Debes memorizar: bin, bist, ist, sind, seid, sind",
        },
        {
          verb: "haben",
          type: "irregular",
          help: "¡ALERTA! Irregular: habe, hast, hat, haben, habt, haben",
        },
      ],
      tips: [
        "✅ Los verbos regulares siguen un patrón predecible",
        "⚠️ Los verbos irregulares (sein, haben, werden) debes memorizarlos",
        '💡 Observa que "wir" y "sie/Sie" siempre usan la forma del infinitivo',
      ],
    },
    {
      id: "act4",
      title: "Actividad 4: Completar el Diálogo",
      icon: MessageCircle,
      difficulty: "Avanzado",
      color: "bg-orange-500",
      intro:
        "Completa el diálogo usando los verbos correctamente conjugados. Debes elegir el verbo apropiado y conjugarlo según el pronombre. 💡 Hint: Lee primero todo el diálogo para entender el contexto, luego identifica qué pronombre usarías en cada espacio vacío y conjuga el verbo entre paréntesis.",
      strategy: [
        "1. Lee toda la conversación primero",
        "2. Para cada espacio: ¿Quién habla? (identifica el pronombre)",
        "3. ¿Qué acción tiene sentido? (elige el verbo)",
        "4. Conjuga el verbo según el pronombre",
        "5. Verifica: ¿El verbo está en 2ª posición?",
      ],
      dialogueTemplate: `Lena: Hallo! Wie _____ du? (heissen)
Max: Ich _____ Max. Und du? (heissen)
Lena: Ich _____ Lena. Woher _____ du? (kommen)
Max: Ich _____ aus Berlin. Und du? (kommen)
Lena: Ich _____ aus München. Wo _____ du? (wohnen)
Max: Ich _____ in Berlin. Und was _____ du? (wohnen, machen)
Lena: Ich _____ Studentin. Und du? (sein)
Max: Ich _____ auch Student. (sein)`,
      example: {
        dialogue: "Caroline: Woher _____ du? (kommen)",
        solution: "kommst",
        explanation: "Pronombre: du → Verbo: kommen + terminación -st = kommst",
      },
      tips: [
        "Si no estás seguro del significado, usa pons.de o leo.org",
        "Primero decide QUÉ verbo (significado), luego CÓMO conjugarlo",
        "Recuerda: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en",
      ],
    },
    {
      id: "act5",
      title: "Actividad 5: Perfil de Leonard",
      icon: BookOpen,
      difficulty: "Producción",
      color: "bg-pink-500",
      intro:
        "Ahora crearás tu primer texto completo en alemán. Vas a presentar a Leonard usando la información dada.",
      data: {
        Name: "Leonard Theodor",
        Land: "Deutschland",
        Stadt: "Kassel",
        Hobbys: "Reisen, Basketball",
        Haustier: "Papagei",
      },
      structure: [
        "Hallo! Ich bin... (nombre)",
        "Ich komme aus... (país)",
        "Ich wohne in... (ciudad)",
        "Meine Hobbys sind... (hobbies)",
        "Ich habe einen... (mascota)",
      ],
      guidedQuestions: [
        "¿Cómo se presenta Leonard? (Ich bin...)",
        "¿De dónde es? (Ich komme aus...)",
        "¿Dónde vive? (Ich wohne in...)",
        "¿Cuáles son sus hobbies? (Meine Hobbys sind...)",
        "¿Qué mascota tiene? (Ich habe einen Papagei)",
      ],
      tips: [
        "Sigue el orden de la estructura sugerida",
        "Cada oración debe tener verbo en 2ª posición",
        "Usa el chat de la Actividad 1 como modelo",
        'Busca "Papagei" en leo.org si no sabes qué significa',
      ],
    },
    {
      id: "act6",
      title: "Actividad 6: ¡Tu Presentación Personal! ⭐",
      icon: Award,
      difficulty: "Creación Personal",
      color: "bg-red-500",
      intro:
        "¡Ahora te toca a ti! Esta es tu oportunidad de presentarte en alemán. Sé creativo y auténtico.",
      prompts: [
        "Piensa en tu respuesta en español primero",
        "¿Qué quieres compartir sobre ti?",
        "¿Qué hobbies son importantes para ti?",
        "¿Tienes mascotas? ¿Familia interesante?",
      ],
      checklist: [
        "✓ Mi nombre (Ich bin...)",
        "✓ Mi nacionalidad o ciudad (Ich komme aus...)",
        "✓ Dónde vivo (Ich wohne in...)",
        "✓ Mi edad (Ich bin ... Jahre alt) - opcional",
        "✓ Mis hobbies (Meine Hobbys sind...)",
        "✓ Información sobre mascotas/familia",
      ],
      challenge:
        "🏆 DESAFÍO EXTRA: Usa al menos 3 verbos diferentes y varía el orden de tus oraciones (¡pero el verbo siempre en 2ª posición!)",
      tips: [
        "No necesitas frases perfectas. ¡Practica!",
        "Usa DeepL para verificar tus oraciones",
        "Compara con el perfil de Leonard de la Actividad 5",
        "Pide a un compañero o a la IA que revise tu texto",
      ],
    },
  ];

  const germanVerbList = [
    "bin",
    "bist",
    "ist",
    "sind",
    "seid",
    "komme",
    "kommst",
    "kommt",
    "wohne",
    "wohnst",
    "wohnt",
    "habe",
    "hast",
    "hat",
    "haben",
    "werde",
    "wirst",
    "wird",
    "werden",
  ];

  const germanKeywordList = [
    "ich",
    "du",
    "er",
    "sie",
    "wir",
    "ihr",
    "Haus",
    "Hund",
    "Katze",
    "Papagei",
    "kommen",
    "wohnen",
    "Hobby",
  ];

  const expectedAnswers = {
    act1_q0: ["münchen", "aus münchen", "muenchen"],
    act1_q1: ["österreicher", "österreich", "deutsche", "deutsch"],
    act1_q2: ["fotografieren", "fotografie", "fotografin", "fotograf"],
    act1_q3: ["hund", "einen hund", "1"],
    act1_q4: ["twix", "tiramisu"],
    act1_q5: ["training", "fußball", "fussball"],
    // For other open fields we do not require strict expected answers but still analyze grammar
  };

  const expectedAnswersDisplay = {
    act1_q0: "Sebastian kommt aus München.",
    act1_q1: "Annas Vater ist Österreicher und ihre Mutter ist Deutsche.",
    act1_q2: "Annas Hobby ist Fotografieren.",
    act1_q3: "Er hat einen Hund.",
    act1_q4: "Die Katzen heißen Twix und Tiramisu.",
    act1_q5: "Er muss gehen, weil er Training hat.",
    act4: `Lena: Hallo! Wie heißt du?
Max: Ich heiße Max. Und du?
Lena: Ich heiße Lena. Woher kommst du?
Max: Ich komme aus Berlin. Und du?
Lena: Ich komme aus München. Wo wohnst du?
Max: Ich wohne in Berlin. Und was machst du?
Lena: Ich bin Studentin. Und du?
Max: Ich bin auch Student.`,
  };

  // -------------------------
  // Advanced grammar analysis (Option C - local heuristics)
  // Returns detailed object with booleans and suggestions
  function analyzeGrammarAdvanced(text) {
    const result = {
      raw: text || "",
      wordCount: 0,
      capitalizedSentence: false,
      endsWithPunctuation: false,
      pronounPresent: false,
      verbPresent: false,
      verbSecondPos: false,
      verbsFound: [],
      suggestions: [],
      score: 0, // 0..100
      level: "Básico",
    };
    if (!text || !text.trim()) {
      result.suggestions.push(
        "No hay texto. Escribe una oración o palabras clave."
      );
      result.score = 0;
      return result;
    }
    const trimmed = text.trim();
    const tokens = trimmed.split(/\s+/);
    result.wordCount = tokens.length;
    // Capitalization: first char uppercase?
    result.capitalizedSentence = /^[A-ZÄÖÜ]/.test(trimmed);
    // Punctuation end
    result.endsWithPunctuation = /[.!?]$/.test(trimmed);
    // pronouns
    const pronouns = [
      "ich",
      "du",
      "er",
      "sie",
      "es",
      "wir",
      "ihr",
      "sie",
      "Sie",
    ];
    const lower = trimmed.toLowerCase();
    result.pronounPresent = pronouns.some((p) =>
      new RegExp(`\\b${p.toLowerCase()}\\b`).test(lower)
    );
    // verbs list (common German verbs, incl. auxiliaries and modal verbs)
    const commonVerbs = [
      "sein",
      "bin",
      "bist",
      "ist",
      "sind",
      "seid",
      "haben",
      "habe",
      "hast",
      "hat",
      "haben",
      "kommen",
      "komme",
      "kommst",
      "kommt",
      "kommen",
      "wohnen",
      "wohne",
      "wohnst",
      "wohnt",
      "werden",
      "werde",
      "wirst",
      "wird",
      "werden",
      "mögen",
      "mag",
      "magst",
      "möchtest",
      "möchte",
      "können",
      "kann",
      "kannst",
      "könnt",
      "müssen",
      "muss",
      "musst",
      "machen",
      "gehe",
      "gehst",
      "geht",
      "arbeiten",
      "lernen",
      "spielen",
      "reisen",
      "fotografieren",
      "habe",
      "hatte",
      "sah",
      "hatten",
      "lesen",
      "hören",
      "lieben",
    ];
    // Detect verbs present
    result.verbsFound = commonVerbs.filter((v) =>
      new RegExp(`\\b${v}\\b`, "i").test(lower)
    );
    result.verbPresent = result.verbsFound.length > 0;
    // Verb in 2nd position heuristic (V2)
    // token[1] should be a verb (for simple declaratives)
    if (tokens.length >= 2) {
      const second = tokens[1].replace(/[.,!?]/g, "").toLowerCase();
      result.verbSecondPos = commonVerbs.includes(second);
    }
    // Score heuristic composition
    let score = 0;
    // word count
    if (result.wordCount >= 3) score += 25;
    else if (result.wordCount === 2) score += 10;
    // verb presence
    if (result.verbPresent) score += 30;
    // pronoun present helpful
    if (result.pronounPresent) score += 10;
    // V2 rule
    if (result.verbSecondPos) score += 20;
    // capitalization & punctuation
    if (result.capitalizedSentence) score += 5;
    if (result.endsWithPunctuation) score += 5;
    // Cap
    result.score = Math.min(100, score);
    // level mapping
    if (result.score >= 75) result.level = "Avanzado";
    else if (result.score >= 45) result.level = "Intermedio";
    else result.level = "Básico";
    // suggestions to improve
    if (!result.verbPresent)
      result.suggestions.push(
        "Incluye un verbo conjugado (p.ej. 'ich bin', 'er hat', 'wir kommen')."
      );
    if (!result.verbSecondPos && result.wordCount >= 3)
      result.suggestions.push(
        "Verifica la posición del verbo: en oraciones declarativas el verbo suele estar en 2ª posición (V2)."
      );
    if (!result.capitalizedSentence)
      result.suggestions.push("Empieza la oración con mayúscula.");
    if (!result.endsWithPunctuation)
      result.suggestions.push(
        "Agrega punto final o signo de interrogación si corresponde."
      );
    if (!result.pronounPresent && result.wordCount < 4)
      result.suggestions.push(
        "Añade un pronombre o sujeto para mayor claridad (p.ej. 'Ich', 'Er')."
      );
    return result;
  }

  // Generate user-friendly feedback string from analyzeGrammarAdvanced
  function generateAdvancedFeedback(text, fieldId) {
    const analysis = analyzeGrammarAdvanced(text);
    // base line
    let fb = `🔤 Palabras: ${analysis.wordCount}. Nivel estimado: ${analysis.level} (${analysis.score}%).`;
    if (analysis.verbsFound.length) {
      fb += ` ✓ Verbo(s) detectado(s): ${analysis.verbsFound
        .slice(0, 5)
        .join(", ")}.`;
    } else {
      fb += ` ❌ No detecté verbos conocidos.`;
    }
    if (analysis.verbSecondPos)
      fb += ` ✅ Verbo en 2ª posición (V2) detectado.`;
    else if (analysis.wordCount >= 3)
      fb += ` ⚠️ No parece haber verbo en 2ª posición (V2).`;
    if (analysis.pronounPresent) fb += ` ✓ Pronombre personal detectado.`;
    if (!analysis.capitalizedSentence)
      fb += ` ⚠️ Considera iniciar con mayúscula.`;
    if (!analysis.endsWithPunctuation)
      fb += ` ℹ️ Puedes añadir puntuación final.`;
    if (analysis.suggestions.length) {
      fb += `
Sugerencias: ${analysis.suggestions.join(" ")}`;
    }
    // If we have an expected answer for this field, also indicate similarity (loose)
    if (expectedAnswers[fieldId]) {
      const lower = (text || "").toLowerCase();
      const expectedList = expectedAnswers[fieldId];
      // check direct includes first
      const directMatch = expectedList.some((e) => lower.includes(e));
      if (directMatch) {
        fb += `
✅ Coincide con la respuesta esperada.`;
      } else {
        // token overlap heuristic (simple)
        const tokens = lower
          .replace(/[.,!?]/g, "")
          .split(/\s+/)
          .filter(Boolean);
        let bestOverlap = 0;
        expectedList.forEach((e) => {
          const etoks = e
            .replace(/[.,!?]/g, "")
            .split(/\s+/)
            .filter(Boolean);
          const overlap = etoks.filter((t) => tokens.includes(t)).length;
          const score = overlap / Math.max(etoks.length, tokens.length || 1);
          if (score > bestOverlap) bestOverlap = score;
        });
        if (bestOverlap >= 0.6)
          fb += `
✅ Similar a la respuesta esperada (${Math.round(
            bestOverlap * 100
          )}% tokens coincidentes).`;
        else
          fb += `
❌ No coincide con la respuesta esperada. Usa "Mostrar solución" si quieres ver el modelo.`;
      }
    }
    return fb;
  }

  // Update answer handler (now uses advanced validation)
  const updateAnswer = (activityId, value) => {
    setUserAnswers((prev) => ({ ...prev, [activityId]: value }));
    const fb = generateAdvancedFeedback(value, activityId);
    setFeedback((prev) => ({ ...prev, [activityId]: fb }));
  };

  // -------------------------
  // Supabase interactions (save / fetch)
  async function saveAnswerToSupabase(activityId, fieldId) {
    if (!emailValid || !nameValid) {
      alert(
        "Por favor completa tu nombre completo y usa un correo institucional válido (azc.uam.mx) antes de guardar."
      );
      return;
    }
    if (!supabase) {
      alert(
        "Supabase no está configurado en este entorno. Usa guardado local o configura REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY."
      );
      return;
    }
    const content = userAnswers[fieldId] || "";
    if (!content.trim()) {
      alert("No hay contenido para guardar.");
      return;
    }
    setSavingStatus((s) => ({ ...s, [fieldId]: "saving" }));
    try {
      const { data, error } = await supabase.from("submissions").insert([
        {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          activity_id: activityId,
          field_id: fieldId,
          content,
        },
      ]);
      if (error) throw error;
      setSavingStatus((s) => ({ ...s, [fieldId]: "saved" }));
      setTimeout(
        () => setSavingStatus((s) => ({ ...s, [fieldId]: undefined })),
        2000
      );
    } catch (err) {
      console.error("Supabase insert error:", err);
      setSavingStatus((s) => ({ ...s, [fieldId]: "error" }));
      alert(
        "Error al guardar en el backend. Revisa la consola y las variables de entorno."
      );
    }
  }

  // Local save / load (in-browser) helpers
  function saveLocally(fieldId) {
    const data = JSON.parse(
      localStorage.getItem("german_learning_local_v1") || "{}"
    );
    data[fieldId] = userAnswers[fieldId] || "";
    localStorage.setItem("german_learning_local_v1", JSON.stringify(data));
    alert("✅ Respuesta guardada localmente en tu navegador.");
  }

  function loadLocal(fieldId) {
    const data = JSON.parse(
      localStorage.getItem("german_learning_local_v1") || "{}"
    );
    return data[fieldId] || "";
  }

  function clearAnswer(fieldId) {
    setUserAnswers((p) => ({ ...p, [fieldId]: "" }));
    setFeedback((p) => ({ ...p, [fieldId]: "Respuesta borrada." }));
  }

  // markComplete helpers
  const completedCount = Object.keys(completedActivities).filter(
    (k) => completedActivities[k]
  ).length;
  const progressPercent = Math.round(
    (completedCount / activities.length) * 100
  );

  // -------------------------
  // UI Rendering
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">Deutsche Syntaxis 🇩🇪</h1>
          <p className="text-xl opacity-90">
            Interaktive Lernplattform für Anfänger
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Info Card - MEJORADA */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold mb-3">👤 Datos del estudiante</h2>
          <p className="text-sm text-gray-600 mb-4">
            <strong>
              ¡Hola! Necesito estos datos para que{" "}
              <em>Ich, dein Deutschlehrer</em>, pueda:
            </strong>
            <br />
            • Identificar tus respuestas y darte feedback personalizado
            <br />
            • Contactarte por correo si necesitas ayuda adicional
            <br />• Llevar un registro de tu progreso en el curso
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nombre completo *
              </label>
              <input
                className={`mt-1 w-full p-3 border rounded-lg focus:outline-none ${
                  nameValid
                    ? "border-green-400 ring-1 ring-green-200"
                    : "border-gray-300"
                }`}
                placeholder="Ej: Juana Pérez García"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <p className="text-xs mt-1 text-gray-500">
                {nameValid
                  ? "✅ Nombre válido"
                  : "Ingresa tu nombre y apellido completos"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Correo institucional *
              </label>
              <input
                className={`mt-1 w-full p-3 border rounded-lg focus:outline-none ${
                  emailValid
                    ? "border-green-400 ring-1 ring-green-200"
                    : "border-gray-300"
                }`}
                placeholder="ejemplo@azc.uam.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs mt-1 text-gray-500">
                {emailValid
                  ? "✅ Correo institucional válido"
                  : "Debe terminar en @azc.uam.mx para recibir feedback"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                if (!nameValid || !emailValid) {
                  alert(
                    "Por favor completa nombre y correo institucional válido antes de continuar."
                  );
                  return;
                }
                // Guardado local de los datos del usuario para la sesión
                localStorage.setItem(
                  "german_learning_user",
                  JSON.stringify({ fullName, email })
                );
                alert(
                  "✅ Datos guardados. ¡Ya puedes empezar con las actividades!"
                );
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold"
            >
              💾 Guardar mis datos
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Herramientas
            Recomendadas
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-400"
              >
                <div>
                  <p className="font-semibold text-gray-800">{resource.name}</p>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Tu Progreso</h3>
          <div className="flex items-center gap-4">
            <div className="flex-grow bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-semibold text-gray-700">
              {completedCount} / {activities.length} ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isExpanded = expandedSections[activity.id];
            const isCompleted = completedActivities[activity.id];
            return (
              <div
                key={activity.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
                  isCompleted ? "border-green-400" : "border-gray-200"
                }`}
              >
                <div
                  className={`${activity.color} text-white p-6 cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => toggleSection(activity.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{activity.title}</h3>
                        <p className="opacity-90 mt-1">
                          Nivel: {activity.difficulty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isCompleted && <Check className="w-8 h-8" />}
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="p-6">
                    <div className="bg-gray-50 border-l-4 border-blue-400 p-4 rounded mb-6">
                      <p className="text-gray-700 font-medium">
                        {activity.intro}
                      </p>
                    </div>

                    {/* Preguntas (actividad tipo Q/A) */}
                    {activity.questions && (
                      <div className="space-y-4">
                        {activity.questions.map((item, idx) => {
                          const fieldId = `${activity.id}_q${idx}`;
                          return (
                            <div
                              key={idx}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <p className="font-semibold text-gray-800 mb-2">
                                {item.q}
                              </p>
                              <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-2"
                                rows="2"
                                placeholder="Escribe tu respuesta aquí..."
                                value={userAnswers[fieldId] || ""}
                                onChange={(e) =>
                                  updateAnswer(fieldId, e.target.value)
                                }
                              />
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={() => {
                                      const fb = generateAdvancedFeedback(
                                        userAnswers[fieldId] || "",
                                        fieldId
                                      );
                                      setFeedback((p) => ({
                                        ...p,
                                        [fieldId]: fb,
                                      }));
                                    }}
                                    className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Zap className="w-4 h-4" /> ✅ Revisar mi
                                    respuesta
                                  </button>
                                  <button
                                    onClick={() => toggleSolution(fieldId)}
                                    className="text-sm bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />{" "}
                                    {showSolution[fieldId]
                                      ? "👁️ Ocultar solución modelo"
                                      : "👁️ Mostrar solución modelo"}
                                  </button>
                                  <button
                                    onClick={() => saveLocally(fieldId)}
                                    className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Save className="w-4 h-4" /> 💾 Guardar
                                    respuesta local
                                  </button>
                                  <button
                                    onClick={() => clearAnswer(fieldId)}
                                    className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" /> 🧹 Borrar
                                    respuesta
                                  </button>
                                </div>
                                <div className="text-right w-2/3">
                                  <p className="text-xs text-gray-500 whitespace-pre-line">
                                    {feedback[fieldId] ||
                                      "Sin feedback aún. Pulsa 'Revisar mi respuesta' para obtener análisis."}
                                  </p>
                                  <div className="mt-2 flex items-center gap-2 justify-end">
                                    <button
                                      onClick={() =>
                                        saveAnswerToSupabase(
                                          activity.id,
                                          fieldId
                                        )
                                      }
                                      disabled={!emailValid || !nameValid}
                                      className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                      {savingStatus[fieldId] === "saving"
                                        ? "Guardando..."
                                        : "💾 Guardar respuesta en servidor"}
                                    </button>
                                    <button
                                      onClick={() =>
                                        navigator.clipboard?.writeText(
                                          userAnswers[fieldId] || ""
                                        )
                                      }
                                      className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                                    >
                                      Copiar
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {showSolution[fieldId] &&
                                expectedAnswersDisplay[fieldId] && (
                                  <div className="mt-3 bg-purple-50 border border-purple-200 rounded p-3 text-sm text-gray-700">
                                    💡 <strong>Solución modelo:</strong>{" "}
                                    {expectedAnswersDisplay[fieldId]}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Tasks (actividad 2) - MEJORADA CON BOTONES */}
                    {activity.tasks && (
                      <div className="space-y-4">
                        {activity.tasks.map((task, idx) => {
                          const fieldId = `${activity.id}_task${idx}`;
                          return (
                            <div
                              key={idx}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <p className="font-semibold text-gray-800 mb-2">
                                {task.task}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                <em>{task.examples}</em>
                              </p>
                              <button
                                onClick={() =>
                                  toggleHint(`${activity.id}_task${idx}`)
                                }
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 mb-2"
                              >
                                <Lightbulb className="w-4 h-4" />{" "}
                                {showHints[`${activity.id}_task${idx}`]
                                  ? "Ocultar ayuda"
                                  : "Ver ayuda"}
                              </button>
                              {showHints[`${activity.id}_task${idx}`] && (
                                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-2">
                                  <p className="text-sm text-gray-700">
                                    {task.hint}
                                  </p>
                                </div>
                              )}
                              <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                rows="3"
                                placeholder={task.question}
                                value={userAnswers[fieldId] || ""}
                                onChange={(e) =>
                                  updateAnswer(fieldId, e.target.value)
                                }
                              />
                              <div className="flex items-start justify-between gap-4 mt-2">
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={() => {
                                      const fb = generateAdvancedFeedback(
                                        userAnswers[fieldId] || "",
                                        fieldId
                                      );
                                      setFeedback((p) => ({
                                        ...p,
                                        [fieldId]: fb,
                                      }));
                                    }}
                                    className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Zap className="w-4 h-4" /> Revisar
                                  </button>
                                  <button
                                    onClick={() => saveLocally(fieldId)}
                                    className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Save className="w-4 h-4" /> Guardar local
                                  </button>
                                  <button
                                    onClick={() => clearAnswer(fieldId)}
                                    className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" /> Borrar
                                  </button>
                                </div>
                                <div className="text-right w-2/3">
                                  <p className="text-xs text-gray-500 whitespace-pre-line">
                                    {feedback[fieldId] || "Sin feedback aún."}
                                  </p>
                                  <div className="mt-2 flex items-center gap-2 justify-end">
                                    <button
                                      onClick={() =>
                                        saveAnswerToSupabase(
                                          activity.id,
                                          fieldId
                                        )
                                      }
                                      disabled={!emailValid || !nameValid}
                                      className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                      {savingStatus[fieldId] === "saving"
                                        ? "Guardando..."
                                        : "💾 Guardar en servidor"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {activity.reflection && (
                          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded mt-4">
                            <p className="text-gray-700 font-medium">
                              {activity.reflection}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Verbos (actividad 3) - MEJORADA CON BOTONES */}
                    {activity.verbos && (
                      <div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="font-bold text-gray-800 mb-3">
                            Pasos a seguir:
                          </h4>
                          {activity.guidance.map((guide, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="font-semibold text-blue-800">
                                {guide.step}
                              </p>
                              <p className="text-sm text-gray-700">
                                {guide.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          {activity.verbos.map((verbo, idx) => {
                            const fieldId = `${activity.id}_verb${idx}`;
                            return (
                              <div
                                key={idx}
                                className="border border-gray-200 rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-bold text-lg text-gray-800">
                                    {verbo.verb}
                                  </h5>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      verbo.type === "irregular"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {verbo.type === "irregular"
                                      ? "Irregular"
                                      : "Regular"}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  {verbo.help}
                                </p>
                                <textarea
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                  rows="4"
                                  placeholder="Escribe la conjugación completa aquí..."
                                  value={userAnswers[fieldId] || ""}
                                  onChange={(e) =>
                                    updateAnswer(fieldId, e.target.value)
                                  }
                                />
                                <div className="flex items-start justify-between gap-4 mt-2">
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={() => {
                                        const fb = generateAdvancedFeedback(
                                          userAnswers[fieldId] || "",
                                          fieldId
                                        );
                                        setFeedback((p) => ({
                                          ...p,
                                          [fieldId]: fb,
                                        }));
                                      }}
                                      className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                                    >
                                      <Zap className="w-4 h-4" /> Revisar
                                    </button>
                                    <button
                                      onClick={() => saveLocally(fieldId)}
                                      className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                                    >
                                      <Save className="w-4 h-4" /> Guardar local
                                    </button>
                                    <button
                                      onClick={() => clearAnswer(fieldId)}
                                      className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                                    >
                                      <Trash2 className="w-4 h-4" /> Borrar
                                    </button>
                                  </div>
                                  <div className="text-right w-2/3">
                                    <p className="text-xs text-gray-500 whitespace-pre-line">
                                      {feedback[fieldId] || "Sin feedback aún."}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 justify-end">
                                      <button
                                        onClick={() =>
                                          saveAnswerToSupabase(
                                            activity.id,
                                            fieldId
                                          )
                                        }
                                        disabled={!emailValid || !nameValid}
                                        className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                      >
                                        {savingStatus[fieldId] === "saving"
                                          ? "Guardando..."
                                          : "💾 Guardar en servidor"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Actividad 4 - MEJORADA */}
                    {activity.strategy && (
                      <div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                          <h4 className="font-bold text-gray-800 mb-3">
                            Estrategia para completar:
                          </h4>
                          <ol className="list-decimal list-inside space-y-2">
                            {activity.strategy.map((s, i) => (
                              <li key={i} className="text-gray-700">
                                {s}
                              </li>
                            ))}
                          </ol>
                        </div>
                        {activity.example && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <h5 className="text-sm font-semibold text-gray-800 mb-2">
                              Ejemplo:
                            </h5>
                            <p className="text-gray-700 mb-1">
                              {activity.example.dialogue}
                            </p>
                            <p className="text-green-700 font-medium">
                              Solución: {activity.example.solution}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.example.explanation}
                            </p>
                          </div>
                        )}
                        {activity.dialogueTemplate && (
                          <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 font-mono text-sm">
                            <pre className="whitespace-pre-wrap">
                              {activity.dialogueTemplate}
                            </pre>
                          </div>
                        )}
                        <textarea
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                          rows="8"
                          placeholder="Escribe aquí el diálogo completo con los verbos conjugados..."
                          value={userAnswers[activity.id] || ""}
                          onChange={(e) =>
                            updateAnswer(activity.id, e.target.value)
                          }
                        />
                        <div className="flex items-start justify-between gap-4 mt-2">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                const fb = generateAdvancedFeedback(
                                  userAnswers[activity.id] || "",
                                  activity.id
                                );
                                setFeedback((p) => ({
                                  ...p,
                                  [activity.id]: fb,
                                }));
                              }}
                              className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Zap className="w-4 h-4" /> Revisar mi texto
                            </button>
                            <button
                              onClick={() => toggleSolution(activity.id)}
                              className="text-sm bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />{" "}
                              {showSolution[activity.id]
                                ? "Ocultar solución"
                                : "Mostrar solución"}
                            </button>
                            <button
                              onClick={() => saveLocally(activity.id)}
                              className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" /> Guardar local
                            </button>
                            <button
                              onClick={() => clearAnswer(activity.id)}
                              className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Borrar
                            </button>
                          </div>
                          <div className="text-right w-2/3">
                            <p className="text-xs text-gray-500 whitespace-pre-line">
                              {feedback[activity.id] || "Sin feedback aún."}
                            </p>
                            <div className="mt-2 flex items-center gap-2 justify-end">
                              <button
                                onClick={() =>
                                  saveAnswerToSupabase(activity.id, activity.id)
                                }
                                disabled={!emailValid || !nameValid}
                                className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                              >
                                {savingStatus[activity.id] === "saving"
                                  ? "Guardando..."
                                  : "💾 Guardar en servidor"}
                              </button>
                            </div>
                          </div>
                        </div>
                        {showSolution[activity.id] &&
                          expectedAnswersDisplay[activity.id] && (
                            <div className="mt-3 bg-purple-50 border border-purple-200 rounded p-3 text-sm text-gray-700">
                              💡 <strong>Solución modelo:</strong>
                              <pre className="whitespace-pre-wrap mt-2">
                                {expectedAnswersDisplay[activity.id]}
                              </pre>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Leonard (actividad 5) - MEJORADA CON BOTONES */}
                    {activity.data && (
                      <div>
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
                          <h4 className="font-bold text-gray-800 mb-3">
                            Información de Leonard:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(activity.data).map(([k, v]) => (
                              <div key={k}>
                                <span className="font-semibold text-gray-700">
                                  {k}:
                                </span>{" "}
                                <span className="text-gray-600">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">
                            Estructura sugerida:
                          </h5>
                          {activity.structure.map((line, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 font-mono text-sm"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        <textarea
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                          rows="8"
                          placeholder="Escribe la presentación de Leonard aquí..."
                          value={userAnswers[activity.id] || ""}
                          onChange={(e) =>
                            updateAnswer(activity.id, e.target.value)
                          }
                        />
                        <div className="flex items-start justify-between gap-4 mt-2">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                const fb = generateAdvancedFeedback(
                                  userAnswers[activity.id] || "",
                                  activity.id
                                );
                                setFeedback((p) => ({
                                  ...p,
                                  [activity.id]: fb,
                                }));
                              }}
                              className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Zap className="w-4 h-4" /> Revisar
                            </button>
                            <button
                              onClick={() => saveLocally(activity.id)}
                              className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" /> Guardar local
                            </button>
                            <button
                              onClick={() => clearAnswer(activity.id)}
                              className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Borrar
                            </button>
                          </div>
                          <div className="text-right w-2/3">
                            <p className="text-xs text-gray-500 whitespace-pre-line">
                              {feedback[activity.id] || "Sin feedback aún."}
                            </p>
                            <div className="mt-2 flex items-center gap-2 justify-end">
                              <button
                                onClick={() =>
                                  saveAnswerToSupabase(activity.id, activity.id)
                                }
                                disabled={!emailValid || !nameValid}
                                className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                              >
                                {savingStatus[activity.id] === "saving"
                                  ? "Guardando..."
                                  : "💾 Guardar en servidor"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actividad 6 - MEJORADA CON BOTONES */}
                    {activity.prompts && (
                      <div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <h4 className="font-bold text-gray-800 mb-3">
                            Antes de empezar, piensa:
                          </h4>
                          {activity.prompts.map((p, idx) => (
                            <p key={idx} className="text-gray-700 mb-1">
                              • {p}
                            </p>
                          ))}
                        </div>
                        <textarea
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                          rows="10"
                          placeholder="Escribe TU presentación personal aquí... ¡Sé creativo/a!"
                          value={userAnswers[activity.id] || ""}
                          onChange={(e) =>
                            updateAnswer(activity.id, e.target.value)
                          }
                        />
                        <div className="flex items-start justify-between gap-4 mt-2">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                const fb = generateAdvancedFeedback(
                                  userAnswers[activity.id] || "",
                                  activity.id
                                );
                                setFeedback((p) => ({
                                  ...p,
                                  [activity.id]: fb,
                                }));
                              }}
                              className="text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Zap className="w-4 h-4" /> Revisar
                            </button>
                            <button
                              onClick={() => saveLocally(activity.id)}
                              className="text-sm bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" /> Guardar local
                            </button>
                            <button
                              onClick={() => clearAnswer(activity.id)}
                              className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Borrar
                            </button>
                          </div>
                          <div className="text-right w-2/3">
                            <p className="text-xs text-gray-500 whitespace-pre-line">
                              {feedback[activity.id] || "Sin feedback aún."}
                            </p>
                            <div className="mt-2 flex items-center gap-2 justify-end">
                              <button
                                onClick={() =>
                                  saveAnswerToSupabase(activity.id, activity.id)
                                }
                                disabled={!emailValid || !nameValid}
                                className="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                              >
                                {savingStatus[activity.id] === "saving"
                                  ? "Guardando..."
                                  : "💾 Guardar en servidor"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tips Section */}
                    {activity.tips && (
                      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-4">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-600" />{" "}
                          Consejos útiles:
                        </h4>
                        <ul className="space-y-1">
                          {activity.tips.map((tip, idx) => (
                            <li key={idx} className="text-gray-700 text-sm">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mark Complete Button */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => markComplete(activity.id)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          isCompleted
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <Check className="w-5 h-5" />{" "}
                        {isCompleted
                          ? "¡Completada!"
                          : "Marcar como completada"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer / Grammar reference */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            📚 Referencia Rápida de Gramática
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg text-blue-700 mb-2">
                Posición del Verbo
              </h4>
              <p className="text-gray-700 mb-2">
                El verbo conjugado siempre en 2ª posición (V2) en oraciones
                declarativas simples.
              </p>
              <div className="bg-blue-50 p-3 rounded font-mono text-sm space-y-1">
                <p>
                  <span className="text-green-600 font-bold">Ich</span>{" "}
                  <span className="text-red-600 font-bold">komme</span> aus
                  München.
                </p>
                <p>
                  <span className="text-green-600 font-bold">
                    Nächste Woche
                  </span>{" "}
                  <span className="text-red-600 font-bold">werde</span>{" "}
                  <span className="text-purple-600">ich</span> 20!
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg text-blue-700 mb-2">
                Pronombres Personales
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p>
                    <span className="font-bold">ich</span> - yo
                  </p>
                  <p>
                    <span className="font-bold">du</span> - tú
                  </p>
                  <p>
                    <span className="font-bold">er/sie/es</span> - él/ella/eso
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">wir</span> - nosotros
                  </p>
                  <p>
                    <span className="font-bold">ihr</span> - vosotros
                  </p>
                  <p>
                    <span className="font-bold">sie/Sie</span> - ellos/usted
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg text-green-700 mb-2">
                Verbos Regulares
              </h4>
              <p className="text-gray-700 mb-2">
                Ejemplo: <strong>wohnen</strong>
              </p>
              <div className="bg-green-50 p-3 rounded font-mono text-sm space-y-1">
                <p>
                  ich wohn<span className="text-red-600 font-bold">e</span>
                </p>
                <p>
                  du wohn<span className="text-red-600 font-bold">st</span>
                </p>
                <p>
                  er/sie/es wohn
                  <span className="text-red-600 font-bold">t</span>
                </p>
                <p>
                  wir wohn<span className="text-red-600 font-bold">en</span>
                </p>
                <p>
                  ihr wohn<span className="text-red-600 font-bold">t</span>
                </p>
                <p>
                  sie/Sie wohn<span className="text-red-600 font-bold">en</span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-bold text-lg text-red-700 mb-2">
                Verbo Irregular: sein
              </h4>
              <p className="text-gray-700 mb-2">¡Memoriza estas formas!</p>
              <div className="bg-red-50 p-3 rounded font-mono text-sm space-y-1">
                <p>
                  ich <span className="text-red-600 font-bold">bin</span>
                </p>
                <p>
                  du <span className="text-red-600 font-bold">bist</span>
                </p>
                <p>
                  er/sie/es <span className="text-red-600 font-bold">ist</span>
                </p>
                <p>
                  wir <span className="text-red-600 font-bold">sind</span>
                </p>
                <p>
                  ihr <span className="text-red-600 font-bold">seid</span>
                </p>
                <p>
                  sie/Sie <span className="text-red-600 font-bold">sind</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">¡Excelente trabajo! 🎉</h3>
          <p className="text-lg opacity-90 mb-3">
            Recuerda: Aprender un idioma es un proceso. Cada error es una
            oportunidad de aprender.
          </p>
          <p className="text-md opacity-80">Viel Erfolg! (¡Mucho éxito!)</p>
        </div>
      </div>
    </div>
  );
}
