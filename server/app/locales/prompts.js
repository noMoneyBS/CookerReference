// 后端多语言提示词配置
const prompts = {
  zh: {
    template: `根据以下条件推荐3个不同的菜谱：
食材：{ingredients}
{preferences}
{context}

**重要：你必须严格按照以下JSON格式返回，不要添加任何其他文字或说明：**

[
[
  {
    "name": "菜名",
    "description": "简短描述（1-2句话）",
    "cookingTime": "烹饪时间（如：30分钟）",
    "difficulty": "难度等级（简单/中等/困难）",
    "servings": "份量（如：2-3人份）",
    "ingredients": [
      {
        "name": "食材名称",
        "amount": "用量（如：2个、300g）",
        "notes": "备注（可选，如：切块、去皮）"
      }
    ],
    "steps": [
      {
        "step": 1,
        "instruction": "详细步骤说明",
        "time": "预计时间（如：5分钟）"
      }
    ],
    "nutrition": {
      "calories": "具体数值 kcal（如：350 kcal）",
      "protein": "具体数值 g（如：25 g）",
      "fat": "具体数值 g（如：15 g）",
      "carbs": "具体数值 g（如：30 g）",
      "fiber": "具体数值 g（如：5 g）"
    },
    "tips": ["烹饪小贴士1", "烹饪小贴士2"],
    "tags": ["标签1", "标签2"]
  }
]

**严格注意：**
1. 必须返回有效的JSON格式，不要添加任何解释文字
2. 确保所有内容（包括菜名、食材、步骤）都使用中文
3. 如果无法生成完整信息，请用"待补充"填充相应字段
4. 只返回JSON数组，不要有其他内容`,
    preferences: {
      prefix: "用户偏好：",
      lowSalt: "少盐",
      lowOil: "少油", 
      spicy: "偏辣",
      vegetarian: "素食",
      cuisine: "喜欢"
    },
    context: {
      scene: "场景：",
      budget: "预算："
    }
  },
  
  en: {
    template: `Recommend 3 different recipes based on the following conditions:
Ingredients: {ingredients}
{preferences}
{context}

**IMPORTANT: You must return exactly in the following JSON format, do not add any other text or explanations:**

[
[
  {
    "name": "Recipe Name",
    "description": "Brief description (1-2 sentences)",
    "cookingTime": "Cooking time (e.g., 30 minutes)",
    "difficulty": "Difficulty level (Easy/Medium/Hard)",
    "servings": "Servings (e.g., 2-3 people)",
    "ingredients": [
      {
        "name": "Ingredient name",
        "amount": "Amount (e.g., 2 pieces, 300g)",
        "notes": "Notes (optional, e.g., diced, peeled)"
      }
    ],
    "steps": [
      {
        "step": 1,
        "instruction": "Detailed step instruction",
        "time": "Estimated time (e.g., 5 minutes)"
      }
    ],
    "nutrition": {
      "calories": "specific value kcal (e.g., 350 kcal)",
      "protein": "specific value g (e.g., 25 g)",
      "fat": "specific value g (e.g., 15 g)",
      "carbs": "specific value g (e.g., 30 g)",
      "fiber": "specific value g (e.g., 5 g)"
    },
    "tips": ["Cooking tip 1", "Cooking tip 2"],
    "tags": ["tag1", "tag2"]
  }
]

**STRICT REQUIREMENTS:**
1. Must return valid JSON format only, no additional explanatory text
2. Ensure all content (including recipe names, ingredients, and steps) is in English
3. If unable to generate complete information, use "TBD" for missing fields
4. Return only the JSON array, no other content`,
    preferences: {
      prefix: "User preferences: ",
      lowSalt: "low salt",
      lowOil: "low oil",
      spicy: "spicy",
      vegetarian: "vegetarian", 
      cuisine: "prefers"
    },
    context: {
      scene: "Scene: ",
      budget: "Budget: "
    }
  },
  
  ja: {
    template: `以下の条件に基づいて3つの異なるレシピを推薦してください：
食材：{ingredients}
{preferences}
{context}

**重要：以下のJSON形式で正確に返してください。他の説明文は追加しないでください：**

[
[
  {
    "name": "料理名",
    "ingredients": ["食材1","食材2"],
    "steps": ["手順1","手順2"],
    "nutrients": {"calories":"具体数值 kcal（如：350 kcal）","protein":"具体数值 g（如：25 g）","fat":"具体数值 g（如：15 g）"}
  }
]

**厳格な要件：**
1. 有効なJSON形式のみを返し、説明文は追加しない
2. すべての内容（料理名、食材、手順を含む）が日本語であることを確認
3. 完全な情報を生成できない場合は、不足しているフィールドに「要補充」を使用
4. JSON配列のみを返し、他の内容は含めない`,
    preferences: {
      prefix: "ユーザー好み：",
      lowSalt: "減塩",
      lowOil: "低脂肪",
      spicy: "辛い",
      vegetarian: "ベジタリアン",
      cuisine: "好み"
    },
    context: {
      scene: "シーン：",
      budget: "予算："
    }
  },
  
  ko: {
    template: `다음 조건에 따라 3개의 다른 레시피를 추천해 주세요:
재료: {ingredients}
{preferences}
{context}

**중요: 다음 JSON 형식으로 정확히 반환하세요. 다른 설명문은 추가하지 마세요:**

[
[
  {
    "name": "요리명",
    "ingredients": ["재료1","재료2"],
    "steps": ["단계1","단계2"],
    "nutrients": {"calories":"구체적 수치 kcal（예：350 kcal）","protein":"구체적 수치 g（예：25 g）","fat":"구체적 수치 g（예：15 g）"}
  }
]

**엄격한 요구사항:**
1. 유효한 JSON 형식만 반환하고, 설명문은 추가하지 않음
2. 모든 내용(요리명, 재료, 단계 포함)이 한국어인지 확인
3. 완전한 정보를 생성할 수 없는 경우, 부족한 필드에 "보완 필요" 사용
4. JSON 배열만 반환하고, 다른 내용은 포함하지 않음`,
    preferences: {
      prefix: "사용자 선호도: ",
      lowSalt: "저염",
      lowOil: "저지방",
      spicy: "매운",
      vegetarian: "채식",
      cuisine: "선호"
    },
    context: {
      scene: "장면: ",
      budget: "예산: "
    }
  },
  
  fr: {
    template: `Recommandez 3 recettes différentes basées sur les conditions suivantes :
Ingrédients : {ingredients}
{preferences}
{context}

Veuillez retourner au format JSON comme suit :
[
  {
    "name": "Nom de la recette",
    "ingredients": ["ingrédient1","ingrédient2"],
    "steps": ["étape1","étape2"],
    "nutrients": {"calories":"valeur spécifique kcal (ex: 350 kcal)","protein":"valeur spécifique g (ex: 25 g)","fat":"valeur spécifique g (ex: 15 g)"}
  }
]

Note : Veuillez vous assurer que tout le contenu (y compris les noms de recettes, ingrédients et étapes) est en français.`,
    preferences: {
      prefix: "Préférences utilisateur : ",
      lowSalt: "peu salé",
      lowOil: "peu gras",
      spicy: "épicé",
      vegetarian: "végétarien",
      cuisine: "préfère"
    },
    context: {
      scene: "Scène : ",
      budget: "Budget : "
    }
  },
  
  de: {
    template: `Empfehlen Sie 3 verschiedene Rezepte basierend auf den folgenden Bedingungen:
Zutaten: {ingredients}
{preferences}
{context}

Bitte geben Sie im JSON-Format zurück:
[
  {
    "name": "Rezeptname",
    "ingredients": ["zutat1","zutat2"],
    "steps": ["schritt1","schritt2"],
    "nutrients": {"calories":"spezifischer Wert kcal (z.B. 350 kcal)","protein":"spezifischer Wert g (z.B. 25 g)","fat":"spezifischer Wert g (z.B. 15 g)"}
  }
]

Hinweis: Bitte stellen Sie sicher, dass alle Inhalte (einschließlich Rezeptnamen, Zutaten und Schritte) auf Deutsch sind.`,
    preferences: {
      prefix: "Benutzerpräferenzen: ",
      lowSalt: "wenig Salz",
      lowOil: "wenig Öl",
      spicy: "scharf",
      vegetarian: "vegetarisch",
      cuisine: "bevorzugt"
    },
    context: {
      scene: "Szene: ",
      budget: "Budget: "
    }
  },
  
  es: {
    template: `Recomienda 3 recetas diferentes basadas en las siguientes condiciones:
Ingredientes: {ingredients}
{preferences}
{context}

Por favor devuelve en formato JSON como sigue:
[
  {
    "name": "Nombre de la receta",
    "ingredients": ["ingrediente1","ingrediente2"],
    "steps": ["paso1","paso2"],
    "nutrients": {"calories":"valor específico kcal (ej: 350 kcal)","protein":"valor específico g (ej: 25 g)","fat":"valor específico g (ej: 15 g)"}
  }
]

Nota: Por favor asegúrate de que todo el contenido (incluyendo nombres de recetas, ingredientes y pasos) esté en español.`,
    preferences: {
      prefix: "Preferencias del usuario: ",
      lowSalt: "poca sal",
      lowOil: "poco aceite",
      spicy: "picante",
      vegetarian: "vegetariano",
      cuisine: "prefiere"
    },
    context: {
      scene: "Escena: ",
      budget: "Presupuesto: "
    }
  },
  
  it: {
    template: `Raccomanda 3 ricette diverse basate sulle seguenti condizioni:
Ingredienti: {ingredients}
{preferences}
{context}

Per favore restituisci in formato JSON come segue:
[
  {
    "name": "Nome della ricetta",
    "ingredients": ["ingrediente1","ingrediente2"],
    "steps": ["passo1","passo2"],
    "nutrients": {"calories":"valore specifico kcal (es: 350 kcal)","protein":"valore specifico g (es: 25 g)","fat":"valore specifico g (es: 15 g)"}
  }
]

Nota: Per favore assicurati che tutto il contenuto (inclusi nomi delle ricette, ingredienti e passi) sia in italiano.`,
    preferences: {
      prefix: "Preferenze utente: ",
      lowSalt: "poco sale",
      lowOil: "poco olio",
      spicy: "piccante",
      vegetarian: "vegetariano",
      cuisine: "preferisce"
    },
    context: {
      scene: "Scena: ",
      budget: "Budget: "
    }
  }
};

// 获取指定语言的配置
function getLanguageConfig(language) {
  return prompts[language] || prompts['zh'];
}

// 生成提示词
function generatePrompt(language, ingredients, preferences, context) {
  console.log("🔧 generatePrompt 被调用，语言:", language);
  const config = getLanguageConfig(language);
  console.log("🔧 获取到的语言配置:", config ? "成功" : "失败");
  
  // 构建偏好文本
  let prefText = "";
  if (preferences) {
    const prefs = [];
    if (preferences.lowSalt) prefs.push(config.preferences.lowSalt);
    if (preferences.lowOil) prefs.push(config.preferences.lowOil);
    if (preferences.spicy) prefs.push(config.preferences.spicy);
    if (preferences.vegetarian) prefs.push(config.preferences.vegetarian);
    if (preferences.cuisine) prefs.push(`${config.preferences.cuisine} ${preferences.cuisine}`);
    
    if (prefs.length > 0) {
      prefText = `${config.preferences.prefix}${prefs.join(", ")}. `;
    }
  }
  
  // 构建上下文文本
  let contextText = "";
  if (context.scene) contextText += `${config.context.scene}${context.scene}. `;
  if (context.budget) contextText += `${config.context.budget}${context.budget}. `;
  
  // 替换模板中的占位符
  return config.template
    .replace('{ingredients}', ingredients)
    .replace('{preferences}', prefText)
    .replace('{context}', contextText);
}

module.exports = {
  getLanguageConfig,
  generatePrompt
};
