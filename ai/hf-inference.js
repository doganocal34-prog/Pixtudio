var HFI=(()=>{var rr=Object.defineProperty;var al=Object.getOwnPropertyDescriptor;var nl=Object.getOwnPropertyNames;var il=Object.prototype.hasOwnProperty;var Ur=(e,t)=>{for(var o in t)rr(e,o,{get:t[o],enumerable:!0})},sl=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of nl(t))!il.call(e,a)&&a!==o&&rr(e,a,{get:()=>t[a],enumerable:!(r=al(t,a))||r.enumerable});return e};var ll=e=>sl(rr({},"__esModule",{value:!0}),e);var Uu={};Ur(Uu,{InferenceClient:()=>ot});var cr={};Ur(cr,{audioClassification:()=>tp,audioToAudio:()=>op,automaticSpeechRecognition:()=>rp,chatCompletion:()=>bp,chatCompletionStream:()=>wp,documentQuestionAnswering:()=>Up,featureExtraction:()=>_p,fillMask:()=>vp,imageClassification:()=>ip,imageSegmentation:()=>sp,imageTextToImage:()=>dp,imageTextToVideo:()=>mp,imageToImage:()=>lp,imageToText:()=>pp,imageToVideo:()=>cp,objectDetection:()=>up,questionAnswering:()=>xp,request:()=>Zl,sentenceSimilarity:()=>Ap,streamingRequest:()=>ep,summarization:()=>Ip,tableQuestionAnswering:()=>Tp,tabularClassification:()=>Op,tabularRegression:()=>Dp,textClassification:()=>Sp,textGeneration:()=>Rp,textGenerationStream:()=>Ep,textRanking:()=>kp,textToAudio:()=>ap,textToImage:()=>fp,textToSpeech:()=>np,textToVideo:()=>gp,tokenClassification:()=>Pp,translation:()=>Cp,visualQuestionAnswering:()=>Mp,zeroShotClassification:()=>Lp,zeroShotImageClassification:()=>yp});var Ne="https://huggingface.co",Re="https://router.huggingface.co",nt=`${Re}/v1`,Mr="X-HF-Bill-To";var ar={baseten:{},cerebras:{},cohere:{},deepinfra:{},"fal-ai":{},"featherless-ai":{},"fireworks-ai":{},groq:{},"hf-inference":{},"humain-ai":{},novita:{},nscale:{},openai:{},openrouter:{},publicai:{},ovhcloud:{},replicate:{},scaleway:{},together:{},wavespeed:{},"zai-org":{}};var $e=class extends Error{constructor(t){super(t),this.name="InferenceClientError"}},T=class extends $e{constructor(t){super(t),this.name="InputError"}},it=class extends $e{constructor(t){super(t),this.name="RoutingError"}},st=class extends $e{httpRequest;httpResponse;constructor(t,o,r){super(t),this.httpRequest={...o,...o.headers?{headers:{...o.headers,..."Authorization"in o.headers?{Authorization:"Bearer [redacted]"}:void 0}}:void 0},this.httpResponse=r}},L=class extends st{constructor(t,o,r){super(t,o,r),this.name="ProviderApiError"}},he=class extends st{constructor(t,o,r){super(t,o,r),this.name="HubApiError"}},g=class extends $e{constructor(t){super(t),this.name="ProviderOutputError"}};function Or(e){return Array.isArray(e)?e:[e]}function Dr(e,t){return Object.assign({},...t.map(o=>{if(e[o]!==void 0)return{[o]:e[o]}}))}function We(e,t){return e.includes(t)}function w(e,t){let o=Array.isArray(t)?t:[t],r=Object.keys(e).filter(a=>!We(o,a));return Dr(e,r)}var M=class{provider;baseUrl;clientSideRoutingOnly;constructor(t,o,r=!1){this.provider=t,this.baseUrl=o,this.clientSideRoutingOnly=r}makeBaseUrl(t){return t.authMethod!=="provider-key"?`${Re}/${this.provider}`:this.baseUrl}makeBody(t){return"data"in t.args&&t.args.data?t.args.data:JSON.stringify(this.preparePayload(t))}makeUrl(t){let o=this.makeBaseUrl(t),r=this.makeRoute(t).replace(/^\/+/,"");return t.urlTransform?t.urlTransform(`${o}/${r}`):`${o}/${r}`}prepareHeaders(t,o){let r={};return t.authMethod!=="none"&&(r.Authorization=`Bearer ${t.accessToken}`),o||(r["Content-Type"]="application/json"),r}},C=class extends M{constructor(t,o,r=!1){super(t,o,r)}makeRoute(){return"v1/chat/completions"}preparePayload(t){return{model:t.model,...w(t.args,"model")}}async getResponse(t){if(typeof t=="object"&&Array.isArray(t?.choices)&&typeof t?.created=="number"&&typeof t?.id=="string"&&typeof t?.model=="string"&&(t.system_fingerprint===void 0||t.system_fingerprint===null||typeof t.system_fingerprint=="string")&&typeof t?.usage=="object")return t;throw new g("Expected ChatCompletionOutput")}},Z=class extends M{constructor(t,o,r=!1){super(t,o,r)}preparePayload(t){return{...t.args,model:t.model}}makeRoute(){return"v1/completions"}async getResponse(t){let o=Or(t);if(Array.isArray(o)&&o.length>0&&o.every(r=>typeof r=="object"&&!!r&&"generated_text"in r&&typeof r.generated_text=="string"))return o[0];throw new g("Expected Array<{generated_text: string}>")}},je=class extends C{constructor(){super("auto","https://router.huggingface.co")}makeBaseUrl(t){if(t.authMethod!=="hf-token")throw new it("Cannot select auto-router when using non-Hugging Face API key.");return this.baseUrl}};function $(e){if(globalThis.Buffer)return globalThis.Buffer.from(e).toString("base64");{let t=[];return e.forEach(o=>{t.push(String.fromCharCode(o))}),globalThis.btoa(t.join(""))}}async function W(e,t="image/jpeg"){let o=await e.arrayBuffer(),r=$(new Uint8Array(o));return`data:${t};base64,${r}`}var nr=["feature-extraction","sentence-similarity"],U=class extends M{constructor(){super("hf-inference",`${Re}/hf-inference`)}preparePayload(t){return t.args}makeUrl(t){return t.model.startsWith("http://")||t.model.startsWith("https://")?t.model:super.makeUrl(t)}makeRoute(t){return t.task&&["feature-extraction","sentence-similarity"].includes(t.task)?`models/${t.model}/pipeline/${t.task}`:`models/${t.model}`}async getResponse(t){return t}},lt=class extends U{preparePayload(t){if(t.outputType==="url")throw new T("hf-inference provider does not support URL output. Use outputType 'blob', 'dataUrl' or 'json' instead.");return t.args}async getResponse(t,o,r,a,n){if(!t)throw new g("Received malformed response from HF-Inference text-to-image API: response is undefined");if(typeof t=="object"){if(a==="json")return{...t};if("data"in t&&Array.isArray(t.data)&&t.data[0].b64_json){let i=t.data[0].b64_json;return a==="dataUrl"?`data:image/jpeg;base64,${i}`:await(await fetch(`data:image/jpeg;base64,${i}`,{signal:n})).blob()}if("output"in t&&Array.isArray(t.output)){let s=await(await fetch(t.output[0],{signal:n})).blob();return a==="dataUrl"?W(s):s}}if(t instanceof Blob)return a==="dataUrl"?W(t):a==="json"?{output:await W(t)}:t;throw new g("Received malformed response from HF-Inference text-to-image API: expected a Blob")}},pt=class extends U{makeUrl(t){let o;return t.model.startsWith("http://")||t.model.startsWith("https://")?o=t.model.trim():o=`${this.makeBaseUrl(t)}/models/${t.model}`,o=o.replace(/\/+$/,""),o.endsWith("/v1")?o+="/chat/completions":o.endsWith("/chat/completions")||(o+="/v1/chat/completions"),o}preparePayload(t){return{...t.args,model:t.model}}async getResponse(t){return t}},ct=class extends U{makeUrl(t){let o;return t.model.startsWith("http://")||t.model.startsWith("https://")?o=t.model.trim():o=`${this.makeBaseUrl(t)}/models/${t.model}`,o=o.replace(/\/+$/,""),o.endsWith("/v1")?o+="/completions":o.endsWith("/completions")||(o+="/v1/completions"),o}preparePayload(t){return{model:t.model,...w(t.args,["inputs","parameters"]),...t.args.parameters?{max_tokens:t.args.parameters.max_new_tokens,...w(t.args.parameters,"max_new_tokens")}:void 0,prompt:t.args.inputs}}async getResponse(t){if(typeof t=="object"&&"choices"in t&&Array.isArray(t.choices)&&typeof t.choices[0]?.text=="string")return{generated_text:t.choices[0].text};throw new g("Received malformed response from HF-Inference text generation API: expected {choices: [{text: string}]}")}},dt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="object"&&o!==null&&typeof o.label=="string"&&typeof o.score=="number"))return t;throw new g("Received malformed response from HF-Inference audio-classification API: expected Array<{label: string, score: number}> but received different format")}},mt=class extends U{async getResponse(t){return t}async preparePayloadAsync(t){return"data"in t?t:{...w(t,"inputs"),data:t.inputs}}},ut=class extends U{async preparePayloadAsync(t){return"data"in t?t:{...w(t,"inputs"),data:t.inputs}}async getResponse(t){if(!Array.isArray(t))throw new g("Received malformed response from HF-Inference audio-to-audio API: expected Array");if(!t.every(o=>typeof o=="object"&&o&&"label"in o&&typeof o.label=="string"&&"content-type"in o&&typeof o["content-type"]=="string"&&"blob"in o&&typeof o.blob=="string"))throw new g("Received malformed response from HF-Inference audio-to-audio API: expected Array<{label: string, audio: Blob}>");return t}},ft=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="object"&&!!o&&typeof o?.answer=="string"&&(typeof o.end=="number"||typeof o.end>"u")&&(typeof o.score=="number"||typeof o.score>"u")&&(typeof o.start=="number"||typeof o.start>"u")))return t[0];throw new g("Received malformed response from HF-Inference document-question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>")}},gt=class extends U{async getResponse(t){let o=(r,a,n=0)=>n>a?!1:r.every(i=>Array.isArray(i))?r.every(i=>o(i,a,n+1)):r.every(i=>typeof i=="number");if(Array.isArray(t)&&o(t,3,0))return t;throw new g("Received malformed response from HF-Inference feature-extraction API: expected Array<number[][][] | number[][] | number[] | number>")}},ht=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.label=="string"&&typeof o.score=="number"))return t;throw new g("Received malformed response from HF-Inference image-classification API: expected Array<{label: string, score: number}>")}},yt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.label=="string"&&typeof o.mask=="string"&&(o.score===void 0||typeof o.score=="number")))return t;throw new g("Received malformed response from HF-Inference image-segmentation API: expected Array<{label: string, mask: string, score: number}>")}async preparePayloadAsync(t){return{...t,inputs:$(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}}},bt=class extends U{async getResponse(t){if(typeof t?.generated_text!="string")throw new g("Received malformed response from HF-Inference image-to-text API: expected {generated_text: string}");return t}async preparePayloadAsync(t){return"data"in t?t:{...w(t,"inputs"),data:t.inputs}}},wt=class extends U{async preparePayloadAsync(t){return t.parameters?{...t,inputs:$(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}:{...t,model:t.model,data:t.inputs}}async getResponse(t){if(t instanceof Blob)return t;throw new g("Received malformed response from HF-Inference image-to-image API: expected Blob")}},_t=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.label=="string"&&typeof o.score=="number"&&typeof o.box.xmin=="number"&&typeof o.box.ymin=="number"&&typeof o.box.xmax=="number"&&typeof o.box.ymax=="number"))return t;throw new g("Received malformed response from HF-Inference object-detection API: expected Array<{label: string, score: number, box: {xmin: number, ymin: number, xmax: number, ymax: number}}>")}},vt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.label=="string"&&typeof o.score=="number"))return t;throw new g("Received malformed response from HF-Inference zero-shot-image-classification API: expected Array<{label: string, score: number}>")}},xt=class extends U{async getResponse(t){let o=t?.[0];if(Array.isArray(o)&&o.every(r=>typeof r?.label=="string"&&typeof r.score=="number"))return o;throw new g("Received malformed response from HF-Inference text-classification API: expected Array<{label: string, score: number}>")}},At=class extends U{async getResponse(t){if(Array.isArray(t)?t.every(o=>typeof o=="object"&&!!o&&typeof o.answer=="string"&&typeof o.end=="number"&&typeof o.score=="number"&&typeof o.start=="number"):typeof t=="object"&&t&&typeof t.answer=="string"&&typeof t.end=="number"&&typeof t.score=="number"&&typeof t.start=="number")return Array.isArray(t)?t[0]:t;throw new g("Received malformed response from HF-Inference question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>")}},kt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.score=="number"&&typeof o.sequence=="string"&&typeof o.token=="number"&&typeof o.token_str=="string"))return t;throw new g("Received malformed response from HF-Inference fill-mask API: expected Array<{score: number, sequence: string, token: number, token_str: string}>")}},It=class e extends U{async getResponse(t){if(typeof t=="object"&&t!==null&&"labels"in t&&"scores"in t&&Array.isArray(t.labels)&&Array.isArray(t.scores)&&t.labels.length===t.scores.length&&t.labels.every(o=>typeof o=="string")&&t.scores.every(o=>typeof o=="number")){let o=t.scores;return t.labels.map((r,a)=>({label:r,score:o[a]}))}if(Array.isArray(t)&&t.every(e.validateOutputElement))return t;throw new g("Received malformed response from HF-Inference zero-shot-classification API: expected Array<{label: string, score: number}>")}static validateOutputElement(t){return typeof t=="object"&&!!t&&"label"in t&&"score"in t&&typeof t.label=="string"&&typeof t.score=="number"}},Tt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="object"&&o!==null&&Number.isInteger(o.index)&&o.index>=0&&typeof o.score=="number"))return t;throw new g("Received malformed response from HF-Inference text-ranking API: expected Array<{ index: number, score: number }>")}},St=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="number"))return t;throw new g("Received malformed response from HF-Inference sentence-similarity API: expected Array<number>")}},Rt=class e extends U{static validate(t){return typeof t=="object"&&!!t&&"aggregator"in t&&typeof t.aggregator=="string"&&"answer"in t&&typeof t.answer=="string"&&"cells"in t&&Array.isArray(t.cells)&&t.cells.every(o=>typeof o=="string")&&"coordinates"in t&&Array.isArray(t.coordinates)&&t.coordinates.every(o=>Array.isArray(o)&&o.every(r=>typeof r=="number"))}async getResponse(t){if(Array.isArray(t)&&Array.isArray(t)?t.every(o=>e.validate(o)):e.validate(t))return Array.isArray(t)?t[0]:t;throw new g("Received malformed response from HF-Inference table-question-answering API: expected {aggregator: string, answer: string, cells: string[], coordinates: number[][]}")}},Et=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o.end=="number"&&typeof o.entity_group=="string"&&typeof o.score=="number"&&typeof o.start=="number"&&typeof o.word=="string"))return t;throw new g("Received malformed response from HF-Inference token-classification API: expected Array<{end: number, entity_group: string, score: number, start: number, word: string}>")}},Pt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o?.translation_text=="string"))return t?.length===1?t?.[0]:t;throw new g("Received malformed response from HF-Inference translation API: expected Array<{translation_text: string}>")}},Ct=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o?.summary_text=="string"))return t?.[0];throw new g("Received malformed response from HF-Inference summarization API: expected Array<{summary_text: string}>")}},Lt=class extends U{async getResponse(t){return t}},Ut=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="number"))return t;throw new g("Received malformed response from HF-Inference tabular-classification API: expected Array<number>")}},Mt=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="object"&&!!o&&typeof o?.answer=="string"&&typeof o.score=="number"))return t[0];throw new g("Received malformed response from HF-Inference visual-question-answering API: expected Array<{answer: string, score: number}>")}},Ot=class extends U{async getResponse(t){if(Array.isArray(t)&&t.every(o=>typeof o=="number"))return t;throw new g("Received malformed response from HF-Inference tabular-regression API: expected Array<number>")}},Dt=class extends U{async getResponse(t){return t}};var cl=console;function ye(){return cl}var ir=new Map;function dl(e,t){return t?Array.isArray(t)?t:Object.entries(t).map(([o,r])=>({provider:o,hfModelId:e,providerId:r.providerId,status:r.status,task:r.task,adapter:r.adapter,adapterWeightsPath:r.adapterWeightsPath})):[]}async function Nr(e,t,o){let r;if(ir.has(e))r=ir.get(e);else{let a=`${Ne}/api/models/${e}?expand[]=inferenceProviderMapping`,n=await(o?.fetch??fetch)(a,{headers:t?.startsWith("hf_")?{Authorization:`Bearer ${t}`}:{}});if(!n.ok)if(n.headers.get("Content-Type")?.startsWith("application/json")){let s=await n.json();if("error"in s&&typeof s.error=="string")throw new he(`Failed to fetch inference provider mapping for model ${e}: ${s.error}`,{url:a,method:"GET"},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:s})}else throw new he(`Failed to fetch inference provider mapping for model ${e}`,{url:a,method:"GET"},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:await n.text()});let i=null;try{i=await n.json()}catch{throw new he(`Failed to fetch inference provider mapping for model ${e}: malformed API response, invalid JSON`,{url:a,method:"GET"},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:await n.text()})}if(!i?.inferenceProviderMapping)throw new he(`We have not been able to find inference provider information for model ${e}.`,{url:a,method:"GET"},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:await n.text()});r=dl(e,i.inferenceProviderMapping),ir.set(e,r)}return r}async function $r(e,t){let o=ye();if(e.provider==="auto"&&e.task==="conversational")return{hfModelId:e.modelId,provider:"auto",providerId:e.modelId,status:"live",task:"conversational"};if(ar[e.provider][e.modelId])return ar[e.provider][e.modelId];let a=(await Nr(e.modelId,e.accessToken,t)).find(n=>n.provider===e.provider);if(a){let n=e.provider==="hf-inference"&&We(nr,e.task)?nr:[e.task];if(!We(n,a.task))throw new T(`Model ${e.modelId} is not supported for task ${e.task} and provider ${e.provider}. Supported task: ${a.task}.`);return a.status==="staging"&&o.warn(`Model ${e.modelId} is in staging mode for provider ${e.provider}. Meant for test purposes only.`),a}return null}async function _(e,t,o,r){let a=ye();if(o){if(e)throw new T("Specifying both endpointUrl and provider is not supported.");return"hf-inference"}if(e||(a.log("Defaulting to 'auto' which will select the first provider available for the model, sorted by the user's order in https://hf.co/settings/inference-providers."),e="auto"),e==="auto"){if(!t)throw new T("Specifying a model is required when provider is 'auto'");e=(await Nr(t,void 0,r))[0]?.provider,a.log("Auto selected provider:",e)}if(!e)throw new T(`No Inference Provider available for model ${t}.`);return e}var ml="https://inference.baseten.co",Nt=class extends C{constructor(){super("baseten",ml)}};var $t=class extends C{constructor(){super("cerebras","https://api.cerebras.ai")}preparePayload(t){return w(super.preparePayload(t),"store")}};var jt=class extends C{constructor(){super("cohere","https://api.cohere.com")}makeRoute(){return"/compatibility/v1/chat/completions"}};var qe="https://api.deepinfra.com",hl={"audio/wav":"wav","audio/x-wav":"wav","audio/wave":"wav","audio/mpeg":"mp3","audio/mp3":"mp3","audio/mp4":"mp4","audio/m4a":"m4a","audio/x-m4a":"m4a","audio/flac":"flac","audio/x-flac":"flac","audio/ogg":"ogg","audio/webm":"webm"};function yl(e){if(!e)return"wav";let t=e.split(";")[0].trim().toLowerCase();return hl[t]??"wav"}var qt=class extends C{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/chat/completions"}},Bt=class extends Z{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/completions"}preparePayload(t){let o=t.args.parameters;return{model:t.model,prompt:t.args.inputs,...w(t.args,["inputs","parameters"]),...o?{max_tokens:o.max_new_tokens,...w(o,["max_new_tokens"])}:void 0}}async getResponse(t){if(typeof t=="object"&&t!==null&&Array.isArray(t.choices)&&t.choices.length>0){let o=t.choices[0].text;if(typeof o=="string")return{generated_text:o}}throw new g("Received malformed response from DeepInfra text-generation API: expected OpenAI completion payload")}},Ft=class extends M{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/audio/transcriptions"}preparePayload(t){return{...w(t.args,["inputs","parameters","data"]),...t.args.parameters,model:t.model}}makeBody(t){let o=t.args.data,r=new FormData;if(o instanceof Blob)r.append("file",o,`audio.${yl(o.type)}`);else throw new T("DeepInfra automatic-speech-recognition expects a Blob audio input.");let a=this.preparePayload(t);for(let[n,i]of Object.entries(a))i!=null&&(typeof i=="string"?r.append(n,i):typeof i=="number"||typeof i=="boolean"?r.append(n,String(i)):r.append(n,JSON.stringify(i)));return r}async preparePayloadAsync(t){let o="data"in t?t.data:t.inputs,r;if(o instanceof Blob)r=o;else if(o instanceof ArrayBuffer)r=new Blob([o]);else throw new T("DeepInfra automatic-speech-recognition expects a Blob or ArrayBuffer audio input.");return{..."data"in t?w(t,"data"):w(t,"inputs"),data:r}}async getResponse(t){if(typeof t=="object"&&t!==null&&typeof t.text=="string"){let o={text:t.text};return Array.isArray(t.segments)&&(o.chunks=t.segments.map(r=>({text:r.text,timestamp:[r.start,r.end]}))),o}throw new g(`Received malformed response from DeepInfra automatic-speech-recognition API: ${JSON.stringify(t)}`)}},Vt=class extends M{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/audio/speech"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,input:t.args.inputs,model:t.model}}async getResponse(t){if(t instanceof Blob)return t;throw new g(`Received malformed response from DeepInfra text-to-speech API: ${JSON.stringify(t)}`)}},Ht=class extends M{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/embeddings"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,input:t.args.inputs,model:t.model}}async getResponse(t){if(typeof t=="object"&&t!==null&&"data"in t&&Array.isArray(t.data)&&t.data.every(o=>typeof o=="object"&&!!o&&Array.isArray(o.embedding)))return t.data.map(o=>o.embedding);throw new g(`Received malformed response from DeepInfra feature-extraction (embeddings) API: ${JSON.stringify(t)}`)}},Xt=class extends M{constructor(){super("deepinfra",qe)}makeRoute(){return"v1/openai/images/generations"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,response_format:t.outputType==="url"?"url":"b64_json",prompt:t.args.inputs,model:t.model}}async getResponse(t,o,r,a,n){if(typeof t=="object"&&t&&"data"in t&&Array.isArray(t.data)&&t.data.length>0){if(a==="json")return{...t};if(typeof t.data[0].url=="string")return t.data[0].url;if(typeof t.data[0].b64_json=="string"){let i=t.data[0].b64_json;return a==="dataUrl"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`,{signal:n}).then(s=>s.blob())}}throw new g("Received malformed response from DeepInfra text-to-image API")}};function K(e){return/^http(s?):/.test(e)||e.startsWith("/")}function jr(e){return e.reason instanceof Error?e.reason:new DOMException("The operation was aborted","AbortError")}function pe(e,t){return t?.aborted?Promise.reject(jr(t)):new Promise((o,r)=>{let a=()=>{},n=setTimeout(()=>{a(),o()},e);if(n.unref?.(),!t)return;let i=()=>{clearTimeout(n),a(),r(jr(t))};a=()=>{t.removeEventListener("abort",i)},t.addEventListener("abort",i,{once:!0})})}var qr={"audio/mpeg":"audio/mpeg","audio/mp3":"audio/mpeg","audio/wav":"audio/x-wav","audio/wave":"audio/x-wav","audio/x-wav":"audio/x-wav","audio/webm":"video/webm","video/webm":"video/webm"},wl=Object.keys(qr);function _l(e){let t=e.split(";")[0].trim().toLowerCase(),o=qr[t];if(!o)throw new T(`Provider fal-ai does not support blob type ${e} - supported content types are: ${wl.join(", ")}`);return o}async function Br(e){let t=e.type;if(!t)throw new T("Unable to determine the input's content-type. Make sure your are passing a Blob when using provider fal-ai.");let o=_l(t),r=$(new Uint8Array(await e.arrayBuffer()));return`data:${o};base64,${r}`}var Ke=class extends M{constructor(t){super("fal-ai",t||"https://fal.run")}preparePayload(t){return t.args}makeRoute(t){return`/${t.model}`}prepareHeaders(t,o){let r={Authorization:t.authMethod!=="provider-key"?`Bearer ${t.accessToken}`:`Key ${t.accessToken}`};return o||(r["Content-Type"]="application/json"),r}},be=class extends Ke{makeRoute(t){return t.authMethod!=="provider-key"?`/${t.model}?_subdomain=queue`:`/${t.model}`}async getResponseFromQueueApi(t,o,r,a){if(!o||!r)throw new T(`URL and headers are required for ${this.task} task`);if(!t.request_id)throw new g(`Received malformed response from Fal.ai ${this.task} API: no request ID found in the response`);let i=t.status,s=new URL(o),d=`${s.protocol}//${s.host}${s.host==="router.huggingface.co"?"/fal-ai":""}`,p=new URL(t.response_url).pathname,c=s.search,l=`${d}${p}/status${c}`,u=`${d}${p}${c}`;for(;i!=="COMPLETED";){await pe(500,a);let N=await fetch(l,{headers:r,signal:a});if(!N.ok)throw new L("Failed to fetch response status from fal-ai API",{url:l,method:"GET"},{requestId:N.headers.get("x-request-id")??"",status:N.status,body:await N.text()});try{i=(await N.json()).status}catch{throw new g("Failed to parse status response from fal-ai API: received malformed response")}}let y=await fetch(u,{headers:r,signal:a}),E;try{E=await y.json()}catch{throw new g("Failed to parse result response from fal-ai API: received malformed response")}return E}};function to(e,t){return`${Ne}/${e}/resolve/main/${t}`}function Fr(e){let t=new URL(e);return t.origin===Re?e:(t.pathname=t.pathname.split("/").slice(0,-1).join("/"),t.toString())}var Yt=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="text-to-image"}preparePayload(t){let o={...w(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs};return t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath&&(o.loras=[{path:to(t.mapping.hfModelId,t.mapping.adapterWeightsPath),scale:1}],t.mapping.providerId==="fal-ai/lora"&&(o.model_name="stabilityai/stable-diffusion-xl-base-1.0")),o}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i=="object"&&"images"in i&&Array.isArray(i.images)&&i.images.length>0&&"url"in i.images[0]&&typeof i.images[0].url=="string"&&K(i.images[0].url)){if(a==="json")return{...i};if(a==="url")return i.images[0].url;let d=await(await fetch(i.images[0].url,{signal:n})).blob();return a==="dataUrl"?W(d):d}throw new g(`Received malformed response from Fal.ai text-to-image API: expected { images: Array<{ url: string }> } result format, got instead: ${JSON.stringify(i)}`)}},Qe=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="image-to-image"}preparePayload(t){let o=t.args;return t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath&&(o.loras=[{path:to(t.mapping.hfModelId,t.mapping.adapterWeightsPath),scale:1}]),o}async preparePayloadAsync(t){let r=`data:${t.inputs instanceof Blob?t.inputs.type:"image/png"};base64,${$(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}`;return{...w(t,["inputs","parameters"]),...t.parameters,image_url:r,image_urls:[r]}}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i=="object"&&i&&"images"in i&&Array.isArray(i.images)&&i.images.length>0&&typeof i.images[0]=="object"&&i.images[0]&&"url"in i.images[0]&&typeof i.images[0].url=="string"&&K(i.images[0].url))return await(await fetch(i.images[0].url,{signal:n})).blob();throw new g(`Received malformed response from Fal.ai image-to-image API: expected { images: Array<{ url: string }> } result format, got instead: ${JSON.stringify(i)}`)}},zt=class extends Qe{constructor(){super(),this.task="image-text-to-image"}async preparePayloadAsync(t){return t.inputs?super.preparePayloadAsync(t):{...w(t,["inputs","parameters"]),...t.parameters,prompt:t.parameters?.prompt,urlTransform:Fr}}},Wt=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="text-to-video"}preparePayload(t){let o={...w(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs};return t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath&&(o.loras=[{path:to(t.mapping.hfModelId,t.mapping.adapterWeightsPath),scale:1}]),o}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i=="object"&&i&&"video"in i&&typeof i.video=="object"&&i.video&&"url"in i.video&&typeof i.video.url=="string"&&K(i.video.url))return await(await fetch(i.video.url,{signal:n})).blob();throw new g(`Received malformed response from Fal.ai text-to-video API: expected { video: { url: string } } result format, got instead: ${JSON.stringify(i)}`)}},Je=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="image-to-video"}preparePayload(t){let o={...w(t.args,["inputs","parameters"]),...t.args.parameters,image_url:t.args.image_url};return t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath&&(o.loras=[{path:to(t.mapping.hfModelId,t.mapping.adapterWeightsPath),scale:1}]),o}async preparePayloadAsync(t){let o=t.inputs instanceof Blob?t.inputs.type:"image/png";return{...w(t,["inputs","parameters"]),image_url:`data:${o};base64,${$(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}`,...t.parameters,...t}}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i=="object"&&i!==null&&"video"in i&&typeof i.video=="object"&&i.video!==null&&"url"in i.video&&typeof i.video.url=="string"&&"url"in i.video&&K(i.video.url))return await(await fetch(i.video.url,{signal:n})).blob();throw new g(`Received malformed response from Fal.ai image\u2011to\u2011video API: expected { video: { url: string } }, got: ${JSON.stringify(i)}`)}},Kt=class extends Je{constructor(){super(),this.task="image-text-to-video"}async preparePayloadAsync(t){return t.inputs?super.preparePayloadAsync(t):{...w(t,["inputs","parameters"]),...t.parameters,prompt:t.parameters?.prompt,urlTransform:Fr}}},Qt=class extends Ke{prepareHeaders(t,o){let r=super.prepareHeaders(t,o);return r["Content-Type"]="application/json",r}async getResponse(t){let o=t,r=typeof o?.text=="string"?o.text:typeof o?.output=="string"?o.output:void 0;if(typeof r!="string")throw new g(`Received malformed response from Fal.ai Automatic Speech Recognition API: expected { text: string } or { output: string } format, got instead: ${JSON.stringify(t)}`);let a={text:r},n=Array.isArray(o.chunks)?o.chunks.filter(i=>typeof i?.text=="string"&&Array.isArray(i.timestamp)).map(i=>({text:i.text,timestamp:i.timestamp})):Array.isArray(o.segments)?o.segments.filter(i=>typeof i?.text=="string").map(i=>({text:i.text,timestamp:[i.start??0,i.end??0]})):[];return n.length>0&&(a.chunks=n),a}async preparePayloadAsync(t){let o="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?t.inputs:void 0;if(!(o instanceof Blob))throw new T("Unable to determine the input's content-type. Make sure your are passing a Blob when using provider fal-ai.");return{..."data"in t?w(t,"data"):w(t,"inputs"),audio_url:await Br(o)}}},Jt=class extends Ke{preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,text:t.args.inputs}}async getResponse(t,o,r,a,n){let i=t;if(typeof i?.audio?.url!="string")throw new g(`Received malformed response from Fal.ai Text-to-Speech API: expected { audio: { url: string } } format, got instead: ${JSON.stringify(t)}`);let s=await fetch(i.audio.url,{signal:n});if(!s.ok)throw new L(`Failed to fetch audio from ${i.audio.url}: ${s.statusText}`,{url:i.audio.url,method:"GET",headers:{"Content-Type":"application/json"}},{requestId:s.headers.get("x-request-id")??"",status:s.status,body:await s.text()});try{return await s.blob()}catch(d){throw new L(`Failed to fetch audio from ${i.audio.url}: ${d instanceof Error?d.message:String(d)}`,{url:i.audio.url,method:"GET",headers:{"Content-Type":"application/json"}},{requestId:s.headers.get("x-request-id")??"",status:s.status,body:await s.text()})}}},Gt=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="text-to-audio"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs}}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n),s=i.audio_file??i.audio;if(typeof s!="object"||!s||typeof s.url!="string"||!K(s.url))throw new g(`Received malformed response from Fal.ai text-to-audio API: expected { audio_file: { url: string } } or { audio: { url: string } } result format, got instead: ${JSON.stringify(i)}`);let d=await fetch(s.url,{signal:n});if(!d.ok)throw new L(`Failed to fetch audio from ${s.url}: ${d.statusText}`,{url:s.url,method:"GET"},{requestId:d.headers.get("x-request-id")??"",status:d.status,body:await d.text()});return await d.blob()}},Zt=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="audio-to-audio"}preparePayload(t){return{...w(t.args,["inputs","parameters","data"]),...t.args.parameters}}async preparePayloadAsync(t){let o="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?t.inputs:void 0;if(!(o instanceof Blob))throw new T(`Expected a Blob input for audio-to-audio with provider fal-ai, got ${typeof o}.`);return{..."data"in t?w(t,"data"):w(t,"inputs"),audio_url:await Br(o)}}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i!="object"||!i||typeof i.audio!="object"||!i.audio||typeof i.audio.url!="string"||!K(i.audio.url))throw new g(`Received malformed response from Fal.ai audio-to-audio API: expected { audio: { url: string } } result format, got instead: ${JSON.stringify(i)}`);let s=await fetch(i.audio.url,{signal:n});if(!s.ok)throw new L(`Failed to fetch audio from ${i.audio.url}: ${s.statusText}`,{url:i.audio.url,method:"GET"},{requestId:s.headers.get("x-request-id")??"",status:s.status,body:await s.text()});let d=new Uint8Array(await s.arrayBuffer()),p=i.audio.content_type??s.headers.get("content-type")??"audio/wav";return[{blob:$(d),"content-type":p,label:typeof i.text=="string"&&i.text.length>0?i.text:"speech"}]}},eo=class extends be{task;constructor(){super("https://queue.fal.run"),this.task="image-segmentation"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,sync_mode:!0}}async preparePayloadAsync(t){let o="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?t.inputs:void 0,r=o instanceof Blob?o.type:"image/png",a=$(new Uint8Array(o instanceof ArrayBuffer?o:await o.arrayBuffer()));return{...w(t,["inputs","parameters","data"]),...t.parameters,...t,image_url:`data:${r};base64,${a}`,sync_mode:!0}}async getResponse(t,o,r,a,n){let i=await this.getResponseFromQueueApi(t,o,r,n);if(typeof i=="object"&&i!==null&&"image"in i&&typeof i.image=="object"&&i.image!==null&&"url"in i.image&&typeof i.image.url=="string"){let s=await fetch(i.image.url,{signal:n});if(!s.ok)throw new L(`Failed to fetch segmentation mask from ${i.image.url}`,{url:i.image.url,method:"GET"},{requestId:s.headers.get("x-request-id")??"",status:s.status,body:await s.text()});let p=await(await s.blob()).arrayBuffer();return[{label:"mask",score:1,mask:$(new Uint8Array(p))}]}throw new g(`Received malformed response from Fal.ai image-segmentation API: expected { image: { url: string } } format, got instead: ${JSON.stringify(t)}`)}};var Vr="https://api.featherless.ai",oo=class extends C{constructor(){super("featherless-ai",Vr)}},ro=class extends Z{constructor(){super("featherless-ai",Vr)}preparePayload(t){return{model:t.model,...w(t.args,["inputs","parameters"]),...t.args.parameters?{max_tokens:t.args.parameters.max_new_tokens,...w(t.args.parameters,"max_new_tokens")}:void 0,prompt:t.args.inputs}}async getResponse(t){if(typeof t=="object"&&"choices"in t&&Array.isArray(t?.choices)&&typeof t?.model=="string")return{generated_text:t.choices[0].text};throw new g("Received malformed response from Featherless AI text generation API")}};var ao=class extends C{constructor(){super("fireworks-ai","https://api.fireworks.ai")}makeRoute(){return"/inference/v1/chat/completions"}};var Hr="https://api.groq.com",no=class extends Z{constructor(){super("groq",Hr)}makeRoute(){return"/openai/v1/chat/completions"}},io=class extends C{constructor(){super("groq",Hr)}makeRoute(){return"/openai/v1/chat/completions"}};var Il="https://api.node.humain.com",so=class extends C{constructor(){super("humain-ai",Il)}};var uo="https://api.novita.ai",Sl=["21:9","16:9","4:3","1:1","3:4","9:16"];function Rl(e){return e===void 0?4:Math.min(15,Math.max(4,Math.round(e/24)))}function El(e){if(!e)return"768P";let t=Math.min(e.width,e.height);return Math.abs(t-768)<=Math.abs(t-1440)?"768P":"2K"}function Pl(e){if(!e)return"16:9";let t=e.width/e.height;return Sl.reduce((o,r)=>{let[a,n]=r.split(":").map(Number),[i,s]=o.split(":").map(Number);return Math.abs(t-a/n)<Math.abs(t-i/s)?r:o})}var lo=class extends Z{constructor(){super("novita",uo)}makeRoute(){return"/v3/openai/chat/completions"}},po=class extends C{constructor(){super("novita",uo)}makeRoute(){return"/v3/openai/chat/completions"}},co=class extends M{constructor(){super("novita",uo)}makeRoute(t){if(t.model!=="MiniMax-H3")throw new T(`Unsupported Novita image-text-to-video model: ${t.model}`);return"/v3/minimax/v2/video_generation"}preparePayload(t){let{prompt:o,num_frames:r,target_size:a,resolution:n=El(a),duration:i=Rl(r),ratio:s=Pl(a),...d}=t.args.parameters??{},p=t.args.inputs;if(!o?.trim())throw new T("Novita MiniMax H3 requires a non-empty parameters.prompt.");return{...w(d,["guidance_scale","negative_prompt","num_inference_steps","seed"]),model:t.model,content:[...o?[{type:"text",text:o}]:[],...p?[{type:"image_url",image_url:{url:p},role:"first_frame"}]:[]],resolution:n,duration:i,ratio:p?"adaptive":s}}async preparePayloadAsync(t){return t.inputs?{...t,inputs:await W(t.inputs,t.inputs.type||"image/png")}:t}async getResponse(t,o,r,a,n){if(!o||!r)throw new T("URL and headers are required for Novita API calls");let i=new URL(o),d=`${`${i.protocol}//${i.host}${i.host==="router.huggingface.co"?"/novita":""}`}/v3/minimax/v2/query/video_generation/${encodeURIComponent(t.task_id)}`;for(;;){let p=await fetch(d,{headers:r,signal:n});if(!p.ok)throw new L("Failed to fetch response status from Novita API",{url:d,method:"GET",headers:r},{requestId:p.headers.get("x-request-id")??"",status:p.status,body:await p.text()});let l=(await p.json()).task;switch(l.status){case"succeeded":{if(!l.content?.url)throw new g("No output URL returned by Novita API");let u=await fetch(l.content.url,{signal:n});if(!u.ok)throw new L("Failed to fetch generation output from Novita API",{url:l.content.url,method:"GET"},{requestId:u.headers.get("x-request-id")??"",status:u.status,body:await u.text()});return u.blob()}case"failed":case"cancelled":throw new g(l.error?.message||`Novita task ${l.status}`);default:await pe(5e3,n)}}}},mo=class extends M{constructor(){super("novita",uo)}makeRoute(t){return`/v3/async/${t.model}`}preparePayload(t){let{num_inference_steps:o,...r}=t.args.parameters??{};return{...w(t.args,["inputs","parameters"]),...r,steps:o,prompt:t.args.inputs}}async getResponse(t,o,r,a,n){if(!o||!r)throw new T("URL and headers are required for text-to-video task");let i=t.task_id;if(!i)throw new g("Received malformed response from Novita text-to-video API: no task ID found in the response");let s=new URL(o),p=`${`${s.protocol}//${s.host}${s.host==="router.huggingface.co"?"/novita":""}`}/v3/async/task-result?task_id=${i}`,c="",l;for(;c!=="TASK_STATUS_SUCCEED"&&c!=="TASK_STATUS_FAILED";){await pe(500,n);let u=await fetch(p,{headers:r,signal:n});if(!u.ok)throw new L("Failed to fetch task result",{url:p,method:"GET",headers:r},{requestId:u.headers.get("x-request-id")??"",status:u.status,body:await u.text()});try{if(l=await u.json(),l&&typeof l=="object"&&"task"in l&&l.task&&typeof l.task=="object"&&"status"in l.task&&typeof l.task.status=="string")c=l.task.status;else throw new g("Received malformed response from Novita text-to-video API: failed to get task status")}catch{throw new g("Received malformed response from Novita text-to-video API: failed to parse task result")}}if(c==="TASK_STATUS_FAILED")throw new g("Novita text-to-video task failed");if(typeof l=="object"&&l&&"videos"in l&&typeof l.videos=="object"&&l.videos&&Array.isArray(l.videos)&&l.videos.length>0&&"video_url"in l.videos[0]&&typeof l.videos[0].video_url=="string"&&K(l.videos[0].video_url))return await(await fetch(l.videos[0].video_url,{signal:n})).blob();throw new g(`Received malformed response from Novita text-to-video API: expected { videos: [{ video_url: string }] } format, got instead: ${JSON.stringify(l)}`)}};var Xr="https://inference.api.nscale.com",fo=class extends C{constructor(){super("nscale",Xr)}},go=class extends M{constructor(){super("nscale",Xr)}preparePayload(t){if(t.outputType==="url")throw new T("nscale provider does not support URL output. Use outputType 'blob', 'dataUrl' or 'json' instead.");return{...w(t.args,["inputs","parameters"]),...t.args.parameters,response_format:"b64_json",prompt:t.args.inputs,model:t.model}}makeRoute(){return"v1/images/generations"}async getResponse(t,o,r,a,n){if(typeof t=="object"&&"data"in t&&Array.isArray(t.data)&&t.data.length>0&&"b64_json"in t.data[0]&&typeof t.data[0].b64_json=="string"){if(a==="json")return{...t};let i=t.data[0].b64_json;return a==="dataUrl"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`,{signal:n}).then(s=>s.blob())}throw new g("Received malformed response from Nscale text-to-image API")}};var Ul="https://api.openai.com",ho=class extends C{constructor(){super("openai",Ul,!0)}};var yo=class extends C{constructor(){super("openrouter","https://openrouter.ai/api")}};var Yr="https://oai.endpoints.kepler.ai.cloud.ovh.net",bo=class extends C{constructor(){super("ovhcloud",Yr)}},wo=class extends Z{constructor(){super("ovhcloud",Yr)}preparePayload(t){return{model:t.model,...w(t.args,["inputs","parameters"]),...t.args.parameters?{max_tokens:t.args.parameters.max_new_tokens,...w(t.args.parameters,"max_new_tokens")}:void 0,prompt:t.args.inputs}}async getResponse(t){if(typeof t=="object"&&"choices"in t&&Array.isArray(t?.choices)&&typeof t?.model=="string")return{generated_text:t.choices[0].text};throw new g("Received malformed response from OVHcloud text generation API")}};var _o=class extends C{constructor(){super("publicai","https://api.publicai.co")}};var Ee=class extends M{constructor(t){super("replicate",t||"https://api.replicate.com")}makeRoute(t){return t.model.includes(":")?"v1/predictions":`v1/models/${t.model}/predictions`}preparePayload(t){return{input:{...w(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs},version:t.model.includes(":")?t.model.split(":")[1]:void 0}}prepareHeaders(t,o){let r={Authorization:`Bearer ${t.accessToken}`,Prefer:"wait"};return o||(r["Content-Type"]="application/json"),r}makeUrl(t){let o=this.makeBaseUrl(t);return t.model.includes(":")?`${o}/v1/predictions`:`${o}/v1/models/${t.model}/predictions`}},vo=class extends Ee{preparePayload(t){return{input:{...w(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs,lora_weights:t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath?`https://huggingface.co/${t.mapping.hfModelId}`:void 0},version:t.model.includes(":")?t.model.split(":")[1]:void 0}}async getResponse(t,o,r,a,n){if(typeof t=="object"&&"output"in t&&typeof t.output=="string"&&K(t.output)){if(a==="json")return{...t};if(a==="url")return t.output;let s=await(await fetch(t.output,{signal:n})).blob();return a==="dataUrl"?W(s):s}if(typeof t=="object"&&"output"in t&&Array.isArray(t.output)&&t.output.length>0&&typeof t.output[0]=="string"){if(a==="json")return{...t};if(a==="url")return t.output[0];let s=await(await fetch(t.output[0],{signal:n})).blob();return a==="dataUrl"?W(s):s}throw new g("Received malformed response from Replicate text-to-image API")}},xo=class extends Ee{preparePayload(t){let o=super.preparePayload(t),r=o.input;if(typeof r=="object"&&r!==null&&"prompt"in r){let a=r;a.text=a.prompt,delete a.prompt}return o}async getResponse(t,o,r,a,n){if(t instanceof Blob)return t;if(t&&typeof t=="object"&&"output"in t){if(typeof t.output=="string")return await(await fetch(t.output,{signal:n})).blob();if(Array.isArray(t.output))return await(await fetch(t.output[0],{signal:n})).blob()}throw new g("Received malformed response from Replicate text-to-speech API")}},Ao=class extends Ee{async getResponse(t,o,r,a,n){if(typeof t=="object"&&t&&"output"in t&&typeof t.output=="string"&&K(t.output))return await(await fetch(t.output,{signal:n})).blob();throw new g("Received malformed response from Replicate text-to-video API")}},ko=class extends Ee{preparePayload(t){return{input:{...w(t.args,["inputs","parameters"]),...t.args.parameters,audio:t.args.inputs},version:t.model.includes(":")?t.model.split(":")[1]:void 0}}async preparePayloadAsync(t){let o="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?t.inputs:void 0;if(!o||!(o instanceof Blob))throw new Error("Audio input must be a Blob");let r=new Uint8Array(await o.arrayBuffer()),a=$(r),n=`data:${o.type||"audio/wav"};base64,${a}`;return{..."data"in t?w(t,"data"):w(t,"inputs"),inputs:n}}async getResponse(t,o,r,a,n){if(typeof t?.output=="string")return{text:t.output};if(Array.isArray(t?.output)&&typeof t.output[0]=="string")return{text:t.output[0]};let i=t?.output;if(i&&typeof i=="object"){if(typeof i.transcription=="string")return{text:i.transcription};if(typeof i.translation=="string")return{text:i.translation};if(typeof i.txt_file=="string")return{text:await(await fetch(i.txt_file,{signal:n})).text()}}throw new g("Received malformed response from Replicate automatic-speech-recognition API")}},Io=class extends Ee{preparePayload(t){let o=t.args.inputs;return{input:{...w(t.args,["inputs","parameters"]),...t.args.parameters,image:o,images:[o],input_image:o,input_images:[o],lora_weights:t.mapping?.adapter==="lora"&&t.mapping.adapterWeightsPath?`https://huggingface.co/${t.mapping.hfModelId}`:void 0},version:t.model.includes(":")?t.model.split(":")[1]:void 0}}async preparePayloadAsync(t){let{inputs:o,...r}=t,a=new Uint8Array(await o.arrayBuffer()),n=$(a),i=`data:${o.type||"image/jpeg"};base64,${n}`;return{...r,inputs:i}}async getResponse(t,o,r,a,n){if(typeof t=="object"&&t&&"output"in t&&Array.isArray(t.output)&&t.output.length>0&&typeof t.output[0]=="string")return await(await fetch(t.output[0],{signal:n})).blob();if(typeof t=="object"&&t&&"output"in t&&typeof t.output=="string"&&K(t.output))return await(await fetch(t.output,{signal:n})).blob();throw new g("Received malformed response from Replicate image-to-image API")}};var sr="https://api.scaleway.ai",To=class extends C{constructor(){super("scaleway",sr)}},So=class extends Z{constructor(){super("scaleway",sr)}preparePayload(t){return{model:t.model,...t.args,prompt:t.args.inputs}}async getResponse(t){if(typeof t=="object"&&t!==null&&"choices"in t&&Array.isArray(t.choices)&&t.choices.length>0){let o=t.choices[0];if(typeof o=="object"&&o&&"text"in o&&o.text&&typeof o.text=="string")return{generated_text:o.text}}throw new g("Received malformed response from Scaleway text generation API")}},Ro=class extends M{constructor(){super("scaleway",sr)}preparePayload(t){return{input:t.args.inputs,model:t.model}}makeRoute(){return"v1/embeddings"}async getResponse(t){return t.data.map(o=>o.embedding)}};var Pe="https://api.together.xyz",ql={"audio/wav":"wav","audio/x-wav":"wav","audio/wave":"wav","audio/mpeg":"mp3","audio/mp3":"mp3","audio/mp4":"mp4","audio/m4a":"m4a","audio/x-m4a":"m4a","audio/flac":"flac","audio/x-flac":"flac","audio/ogg":"ogg","audio/webm":"webm"};function Bl(e){return e?ql[e.toLowerCase()]??"wav":"wav"}var Eo=class extends C{constructor(){super("together",Pe)}preparePayload(t){let o=super.preparePayload(t),r=o.response_format;return r?.type==="json_schema"&&r?.json_schema?.schema&&(o.response_format={type:"json_schema",schema:r.json_schema.schema}),o}},Po=class extends Z{constructor(){super("together",Pe)}preparePayload(t){return{model:t.model,...t.args,prompt:t.args.inputs}}async getResponse(t){if(typeof t=="object"&&"choices"in t&&Array.isArray(t?.choices)&&typeof t?.model=="string"){let o=t.choices[0];return{generated_text:o.text,details:{finish_reason:o.finish_reason,seed:o.seed}}}throw new g("Received malformed response from Together text generation API")}},Ge=class extends M{constructor(){super("together",Pe)}makeRoute(){return"v1/images/generations"}preparePayload(t){let o=t.args.parameters??{},{num_inference_steps:r,...a}=o;return r!==void 0&&(a.steps=r),{...w(t.args,["inputs","parameters"]),...a,prompt:t.args.inputs,response_format:t.outputType==="url"?"url":"base64",model:t.model}}get imageTaskLabel(){return"text-to-image"}async getResponse(t,o,r,a,n){if(typeof t=="object"&&"data"in t&&Array.isArray(t.data)&&t.data.length>0){if(a==="json")return{...t};if("url"in t.data[0]&&typeof t.data[0].url=="string")return t.data[0].url;if("b64_json"in t.data[0]&&typeof t.data[0].b64_json=="string"){let i=t.data[0].b64_json;return a==="dataUrl"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`,{signal:n}).then(s=>s.blob())}}throw new g(`Received malformed response from Together ${this.imageTaskLabel} API`)}},Co=class extends Ge{get imageTaskLabel(){return"image-to-image"}preparePayload(t){let o=t.args.parameters??{},{prompt:r,num_inference_steps:a,...n}=o;a!==void 0&&(n.steps=a);let i=t.model.toLowerCase(),d=i.includes("kontext")&&i.includes("flux.1")?{image_url:t.args.inputs}:{reference_images:[t.args.inputs]};return{...w(t.args,["inputs","parameters"]),prompt:r??"",...d,...n,response_format:"base64",model:t.model}}async preparePayloadAsync(t){let{inputs:o,...r}=t;if(!(o instanceof Blob))throw new T("Together image-to-image expects a Blob input.");let a=await W(o,o.type||"image/jpeg");return{...r,inputs:a}}async getResponse(t,o,r,a){let n=await super.getResponse(t,o,r,a);if(n instanceof Blob)return n;throw new g(`Received malformed response from Together ${this.imageTaskLabel} API`)}},Fl=2e3,zr=150,Vl=new Set(["queued","in_progress"]);function Wr(e){let{num_inference_steps:t,target_size:o,...r}=e??{};return t!==void 0&&(r.steps=t),o&&typeof o=="object"&&(o.width!==void 0&&(r.width=o.width),o.height!==void 0&&(r.height=o.height)),r}var Lo=class extends M{constructor(){super("together",Pe)}makeRoute(){return"v2/videos"}async getResponse(t,o,r,a,n){if(!o||!r)throw new T("URL and headers are required for Together video tasks");let i=t?.id;if(!i)throw new g("Received malformed response from Together video API: no job ID found in the response");let s=`${o}/${i}`,d=t,p=d.status,c=0;for(;p===void 0||Vl.has(p);){if(c>=zr)throw new g(`Timed out while waiting for Together video generation \u2014 aborting after ${zr} status polls`);c+=1,await pe(Fl,n);let y=await fetch(s,{headers:r,signal:n});if(!y.ok)throw new L("Failed to fetch Together video job result",{url:s,method:"GET",headers:r},{requestId:y.headers.get("x-request-id")??"",status:y.status,body:await y.text()});try{d=await y.json()}catch{throw new g("Received malformed response from Together video API: failed to parse job result")}p=d.status}if(p==="failed")throw new g(`Together video generation failed: ${d.error?.message??"Unknown error"}`);if(p!=="completed")throw new g(`Unexpected Together video job status: ${JSON.stringify(p)}`);let l=d.outputs?.video_url;if(typeof l!="string")throw new g("No video URL found in completed Together video job.");let u=await fetch(l,{signal:n});if(!u.ok)throw new L("Failed to download Together video output",{url:l,method:"GET"},{requestId:u.headers.get("x-request-id")??"",status:u.status,body:await u.text()});return await u.blob()}},Uo=class extends Lo{preparePayload(t){return{...w(t.args,["inputs","parameters"]),...Wr(t.args.parameters),prompt:t.args.inputs,model:t.model}}},Mo=class extends Lo{preparePayload(t){let o=t.args.parameters??{},{prompt:r,...a}=o,n=Wr(a),i={...w(t.args,["inputs","parameters"]),...n,frame_images:[{input_image:t.args.inputs,frame:"first"}],model:t.model};return typeof r=="string"&&(i.prompt=r),i}async preparePayloadAsync(t){let{inputs:o,...r}=t;if(!(o instanceof Blob))throw new T("Together image-to-video expects a Blob input.");let a=await W(o,o.type||"image/png");return{...r,inputs:a}}},Oo=class extends M{constructor(){super("together",Pe)}makeRoute(){return"v1/embeddings"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,input:t.args.inputs,model:t.model}}async getResponse(t){if(typeof t=="object"&&t!==null&&"data"in t&&Array.isArray(t.data)&&t.data.every(o=>typeof o=="object"&&!!o&&Array.isArray(o.embedding)))return t.data.map(o=>o.embedding);throw new g(`Received malformed response from Together feature-extraction (embeddings) API: ${JSON.stringify(t)}`)}},Do=class extends M{constructor(){super("together",Pe)}makeRoute(){return"v1/audio/speech"}preparePayload(t){let o=t.args.parameters??{},r=t.model.toLowerCase().includes("kokoro"),a=o.voice??(r?"af_alloy":void 0);return{...w(t.args,["inputs","parameters"]),...o,...a!==void 0?{voice:a}:{},input:t.args.inputs,model:t.model}}async getResponse(t){if(t instanceof Blob)return t;throw new g(`Received malformed response from Together text-to-speech API: ${JSON.stringify(t)}`)}},No=class extends M{constructor(){super("together",Pe)}makeRoute(){return"v1/audio/transcriptions"}preparePayload(t){return{...w(t.args,["inputs","parameters","data"]),...t.args.parameters,model:t.model}}makeBody(t){let o=t.args.data,r=new FormData;if(o instanceof Blob)r.append("file",o,`audio.${Bl(o.type)}`);else if(typeof o=="string")r.append("file",o);else throw new T("Together automatic-speech-recognition expects a Blob, ArrayBuffer, or HTTP(S) URL string audio input.");let a=this.preparePayload(t);for(let[n,i]of Object.entries(a))i!=null&&(typeof i=="string"?r.append(n,i):typeof i=="number"||typeof i=="boolean"?r.append(n,String(i)):r.append(n,JSON.stringify(i)));return r}async preparePayloadAsync(t){let o="data"in t?t.data:t.inputs,r;if(o instanceof Blob)r=o;else if(o instanceof ArrayBuffer)r=new Blob([o]);else if(typeof o=="string"&&/^https?:\/\//.test(o))r=o;else throw new T("Together automatic-speech-recognition expects a Blob, ArrayBuffer, or HTTP(S) URL string audio input.");return{..."data"in t?w(t,"data"):w(t,"inputs"),data:r}}async getResponse(t){if(typeof t=="object"&&t!==null&&typeof t.text=="string"){let o={text:t.text};return Array.isArray(t.segments)&&(o.chunks=t.segments.map(r=>({text:r.text,timestamp:[r.start,r.end]}))),o}throw new g(`Received malformed response from Together automatic-speech-recognition API: ${JSON.stringify(t)}`)}};var tt="https://api.wavespeed.ai";async function Kr(e,t){let o=$(new Uint8Array(e instanceof ArrayBuffer?e:await e.arrayBuffer())),r=Array.isArray(t)&&t.every(a=>typeof a=="string")?t:[o];return{base:o,images:r}}var Be=class extends M{constructor(t){super("wavespeed",t||tt)}makeRoute(t){return`/api/v3/${t.model}`}preparePayload(t){let o={...w(t.args,["inputs","parameters"]),...t.args.parameters?w(t.args.parameters,["images"]):void 0,prompt:t.args.inputs};return t.mapping?.adapter==="lora"&&(o.loras=[{path:t.mapping.hfModelId,scale:1}]),o}async getResponse(t,o,r,a,n){if(!o||!r)throw new T("Headers are required for WaveSpeed AI API calls");let i=new URL(o),s=new URL(t.data.urls.get).pathname,p=`${`${i.protocol}//${i.host}${i.host==="router.huggingface.co"?"/wavespeed":""}`}${s}`;for(;;){let c=await fetch(p,{headers:r,signal:n});if(!c.ok)throw new L("Failed to fetch response status from WaveSpeed AI API",{url:p,method:"GET"},{requestId:c.headers.get("x-request-id")??"",status:c.status,body:await c.text()});let l=await c.json(),u=l.data;switch(u.status){case"completed":{if(!u.outputs?.[0])throw new g("Received malformed response from WaveSpeed AI API: No output URL in completed response");let y=u.outputs[0];if(a==="url")return y;if(a==="json")return l;let E=await fetch(y,{signal:n});if(!E.ok)throw new L("Failed to fetch generation output from WaveSpeed AI API",{url:y,method:"GET"},{requestId:E.headers.get("x-request-id")??"",status:E.status,body:await E.text()});let N=await E.blob();return a==="dataUrl"?W(N):N}case"failed":throw new g(u.error||"Task failed");default:{await pe(500,n);continue}}}}},$o=class extends Be{constructor(){super(tt)}},jo=class extends Be{constructor(){super(tt)}async getResponse(t,o,r,a,n){return super.getResponse(t,o,r,void 0,n)}},Ze=class extends Be{constructor(){super(tt)}async preparePayloadAsync(t){let o=t.images??t.parameters?.images,{base:r,images:a}=await Kr(t.inputs,o);return{...t,inputs:t.parameters?.prompt,image:r,images:a}}async getResponse(t,o,r,a,n){return super.getResponse(t,o,r,void 0,n)}},et=class extends Be{constructor(){super(tt)}async preparePayloadAsync(t){let o=t.images??t.parameters?.images,{base:r,images:a}=await Kr(t.inputs,o);return{...t,inputs:t.parameters?.prompt,image:r,images:a}}async getResponse(t,o,r,a,n){return super.getResponse(t,o,r,void 0,n)}},Xl="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";function Qr(){let e=Uint8Array.from(Buffer.from(Xl,"base64"));return new Blob([e],{type:"image/png"})}var qo=class extends Ze{constructor(){super()}async preparePayloadAsync(t){let o=t.inputs??Qr();return super.preparePayloadAsync({...t,inputs:o})}},Bo=class extends et{constructor(){super()}async preparePayloadAsync(t){let o=t.inputs??Qr();return super.preparePayloadAsync({...t,inputs:o})}};var Gr="https://api.z.ai",Fo=class extends M{constructor(){super("zai-org",Gr)}prepareHeaders(t,o){let r=super.prepareHeaders(t,o);return r["x-source-channel"]="hugging_face",r["accept-language"]="en-US,en",r}},Vo=class extends C{constructor(){super("zai-org",Gr)}prepareHeaders(t,o){let r=super.prepareHeaders(t,o);return r["x-source-channel"]="hugging_face",r["accept-language"]="en-US,en",r}makeRoute(){return"/api/paas/v4/chat/completions"}},Jr=60,zl=5e3,Ho=class extends Fo{makeRoute(){return"/api/paas/v4/async/images/generations"}preparePayload(t){return{...w(t.args,["inputs","parameters"]),...t.args.parameters,model:t.model,prompt:t.args.inputs}}async getResponse(t,o,r,a,n){if(!o||!r)throw new T("URL and headers are required for 'text-to-image' task");if(typeof t!="object"||!t||!("task_status"in t)||!("id"in t)||typeof t.id!="string")throw new g(`Received malformed response from ZAI text-to-image API: expected { id: string, task_status: string }, got: ${JSON.stringify(t)}`);if(t.task_status==="FAIL")throw new g("ZAI API returned task status: FAIL");let i=t.id,s=new URL(o),p=`${`${s.protocol}//${s.host}${s.host==="router.huggingface.co"?"/zai-org":""}`}/api/paas/v4/async-result/${i}`,c={...r,"x-source-channel":"hugging_face","accept-language":"en-US,en"};for(let l=0;l<Jr;l++){await pe(zl,n);let u=await fetch(p,{method:"GET",headers:c,signal:n});if(!u.ok)throw new L(`Failed to fetch result from ZAI text-to-image API: ${u.status}`,{url:p,method:"GET"},{requestId:u.headers.get("x-request-id")??"",status:u.status,body:await u.text()});let y=await u.json();if(y.task_status==="FAIL")throw new g("ZAI text-to-image API task failed");if(y.task_status==="SUCCESS"){if(!y.image_result||!Array.isArray(y.image_result)||y.image_result.length===0||typeof y.image_result[0]?.url!="string"||!K(y.image_result[0].url))throw new g(`Received malformed response from ZAI text-to-image API: expected { image_result: Array<{ url: string }> }, got: ${JSON.stringify(y)}`);let E=y.image_result[0].url;if(a==="json")return{...y};if(a==="url")return E;let F=await(await fetch(E,{signal:n})).blob();return a==="dataUrl"?W(F):F}}throw new g(`Timed out while waiting for the result from ZAI API - aborting after ${Jr} attempts`)}},Xo=class extends Fo{makeRoute(){return"/api/paas/v4/layout_parsing"}async preparePayloadAsync(t,o){let r="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?typeof t.inputs=="string"&&K(t.inputs)?await fetch(t.inputs,{signal:o}).then(s=>s.blob()):t.inputs instanceof Blob?t.inputs:void 0:void 0;if(!r||!(r instanceof Blob))throw new T("ZAI image-to-text requires a URL string or Blob as inputs");let a=r.type||"image/png",n=$(new Uint8Array(await r.arrayBuffer())),i=`data:${a};base64,${n}`;return{..."data"in t?w(t,"data"):w(t,"inputs"),inputs:i}}preparePayload(t){return{model:t.model,file:t.args.inputs}}async getResponse(t){let o=t?.md_results;if(typeof o!="string")throw new g(`Received malformed response from ZAI layout_parsing API: expected { md_results: string }, got: ${JSON.stringify(t)}`);return{generated_text:o,generatedText:o}}};var lr={baseten:{conversational:new Nt},cerebras:{conversational:new $t},cohere:{conversational:new jt},deepinfra:{"automatic-speech-recognition":new Ft,conversational:new qt,"feature-extraction":new Ht,"text-generation":new Bt,"text-to-image":new Xt,"text-to-speech":new Vt},"fal-ai":{"audio-to-audio":new Zt,"automatic-speech-recognition":new Qt,"image-text-to-image":new zt,"image-text-to-video":new Kt,"image-to-image":new Qe,"image-segmentation":new eo,"image-to-video":new Je,"text-to-audio":new Gt,"text-to-image":new Yt,"text-to-speech":new Jt,"text-to-video":new Wt},"featherless-ai":{conversational:new oo,"text-generation":new ro},"hf-inference":{"text-to-image":new lt,conversational:new pt,"text-generation":new ct,"text-classification":new xt,"question-answering":new At,"audio-classification":new dt,"automatic-speech-recognition":new mt,"fill-mask":new kt,"feature-extraction":new gt,"image-classification":new ht,"image-segmentation":new yt,"document-question-answering":new ft,"image-to-text":new bt,"object-detection":new _t,"audio-to-audio":new ut,"zero-shot-image-classification":new vt,"zero-shot-classification":new It,"image-to-image":new wt,"sentence-similarity":new St,"text-ranking":new Tt,"table-question-answering":new Rt,"tabular-classification":new Ut,"text-to-speech":new Lt,"token-classification":new Et,translation:new Pt,summarization:new Ct,"visual-question-answering":new Mt,"tabular-regression":new Ot,"text-to-audio":new Dt},"fireworks-ai":{conversational:new ao},groq:{conversational:new io,"text-generation":new no},"humain-ai":{conversational:new so},novita:{conversational:new po,"image-text-to-video":new co,"text-generation":new lo,"text-to-video":new mo},nscale:{"text-to-image":new go,conversational:new fo},openai:{conversational:new ho},openrouter:{conversational:new yo},ovhcloud:{conversational:new bo,"text-generation":new wo},publicai:{conversational:new _o},replicate:{"text-to-image":new vo,"text-to-speech":new xo,"text-to-video":new Ao,"image-to-image":new Io,"automatic-speech-recognition":new ko},scaleway:{conversational:new To,"text-generation":new So,"feature-extraction":new Ro},together:{"text-to-image":new Ge,"image-to-image":new Co,"text-to-video":new Uo,"image-to-video":new Mo,conversational:new Eo,"text-generation":new Po,"feature-extraction":new Oo,"text-to-speech":new Do,"automatic-speech-recognition":new No},wavespeed:{"text-to-image":new $o,"text-to-video":new jo,"image-to-image":new Ze,"image-to-video":new et,"image-text-to-image":new qo,"image-text-to-video":new Bo},"zai-org":{conversational:new Vo,"text-to-image":new Ho,"image-to-text":new Xo}};function b(e,t){if(e==="hf-inference"&&!t||e==="auto")return new U;if(!t)throw new T("you need to provide a task name when using an external provider, e.g. 'text-to-image'");if(!(e in lr))throw new T(`Provider '${e}' not supported. Available providers: ${Object.keys(lr)}`);let o=lr[e];if(!o||!(t in o))throw new T(`Task '${t}' not supported for provider '${e}'. Available tasks: ${Object.keys(o??{})}`);return o[t]}var Zr="4.13.32",ea="@huggingface/inference";var pr=null;async function Q(e,t,o){let{model:r}=e,a=t.provider,{task:n}=o??{};if(e.endpointUrl&&a!=="hf-inference")throw new T("Cannot use endpointUrl with a third-party provider.");if(r&&K(r))throw new T("Model URLs are no longer supported. Use endpointUrl instead.");if(e.endpointUrl)return Yo(r??e.endpointUrl,t,e,void 0,o);if(!r&&!n)throw new T("No model provided, and no task has been specified.");let i=r??await Kl(n);if(t.clientSideRoutingOnly&&!r)throw new T(`Provider ${a} requires a model ID to be passed directly.`);let s=t.clientSideRoutingOnly?{provider:a,providerId:Jl(r,a),hfModelId:r,status:"live",task:n}:await $r({modelId:i,task:n,provider:a,accessToken:e.accessToken},{fetch:o?.fetch});if(!s)throw new T(`We have not been able to find inference provider information for model ${i}.`);return Yo(s.providerId,t,e,s,o)}function Yo(e,t,o,r,a){let{accessToken:n,endpointUrl:i,provider:s,model:d,urlTransform:p,...c}=o,l=t.provider,{includeCredentials:u,task:y,signal:E,billTo:N,outputType:F}=a??{},j=(()=>{if(t.clientSideRoutingOnly&&n&&n.startsWith("hf_"))throw new T(`Provider ${l} is closed-source and does not support HF tokens.`);return n?n.startsWith("hf_")?"hf-token":"provider-key":u==="include"?"credentials-include":"none"})(),ge=i??e,te=t.makeUrl({authMethod:j,model:ge,task:y,urlTransform:p}),Te=t.prepareHeaders({accessToken:n,authMethod:j},"data"in o&&!!o.data);N&&(Te[Mr]=N);let Xe=[`${ea}/${Zr}`,typeof navigator<"u"?navigator.userAgent:void 0].filter(De=>De!==void 0).join(" ");Te["User-Agent"]=Xe;let G=t.makeBody({args:c,model:e,task:y,mapping:r,outputType:F}),we;typeof u=="string"?we=u:u===!0&&(we="include");let Oe={headers:Te,method:"POST",body:G,...we?{credentials:we}:void 0,signal:E};return{url:te,info:Oe}}async function Kl(e){pr||(pr=await Ql());let t=pr[e];if((t?.models.length??0)<=0)throw new T(`No default model defined for task ${e}, please define the model explicitly.`);return t.models[0].id}async function Ql(){let e=`${Ne}/api/tasks`,t=await fetch(e);if(!t.ok)throw new he("Failed to load tasks definitions from Hugging Face Hub.",{url:e,method:"GET"},{requestId:t.headers.get("x-request-id")??"",status:t.status,body:await t.text()});return await t.json()}function Jl(e,t){if(!e.startsWith(`${t}/`))throw new T(`Models from ${t} must be prefixed by "${t}/". Got "${e}".`);return e.slice(t.length+1)}function oa(e){let t,o,r,a=!1;return function(i){t===void 0?(t=i,o=0,r=-1):t=Gl(t,i);let s=t.length,d=0;for(;o<s;){a&&(t[o]===10&&(d=++o),a=!1);let p=-1;for(;o<s&&p===-1;++o)switch(t[o]){case 58:r===-1&&(r=o-d);break;case 13:a=!0;case 10:p=o;break}if(p===-1)break;e(t.subarray(d,p),r),d=o,r=-1}d===s?t=void 0:d!==0&&(t=t.subarray(d),o-=d)}}function ra(e,t,o){let r=ta(),a=new TextDecoder;return function(i,s){if(i.length===0)o?.(r),r=ta();else if(s>0){let d=a.decode(i.subarray(0,s)),p=s+(i[s+1]===32?2:1),c=a.decode(i.subarray(p));switch(d){case"data":r.data=r.data?r.data+`
`+c:c;break;case"event":r.event=c;break;case"id":e(r.id=c);break;case"retry":{let l=parseInt(c,10);isNaN(l)||t(r.retry=l);break}}}}}function Gl(e,t){let o=new Uint8Array(e.length+t.length);return o.set(e),o.set(t,e.length),o}function ta(){return{data:"",event:"",id:"",retry:void 0}}function ce(e){let t=null;if(e instanceof Blob||e instanceof ArrayBuffer)t="[Blob or ArrayBuffer]";else if(typeof FormData<"u"&&e instanceof FormData)t="[FormData]";else if(typeof e=="string")try{t=JSON.parse(e)}catch{t=e}return t&&typeof t=="object"&&"accessToken"in t&&(t.accessToken="[REDACTED]"),t}async function v(e,t,o){let{url:r,info:a}=await Q(e,t,o),n=await(o?.fetch??fetch)(r,a),i={url:r,info:a};if(o?.retry_on_error!==!1&&n.status===503)return v(e,t,o);if(!n.ok){let d=n.headers.get("Content-Type");if(["application/json","application/problem+json"].some(c=>d?.startsWith(c))){let c=await n.json();throw[400,422,404,500].includes(n.status)&&o?.chatCompletion?new L(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(c.error)}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c}):typeof c.error=="string"||typeof c.detail=="string"||typeof c.message=="string"?new L(`Failed to perform inference: ${c.error??c.detail??c.message}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c}):new L("Failed to perform inference: an HTTP error occurred when requesting the provider.",{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c})}let p=d?.startsWith("text/plain;")?await n.text():void 0;throw new L(`Failed to perform inference: ${p??"an HTTP error occurred when requesting the provider"}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:p??""})}return n.headers.get("Content-Type")?.startsWith("application/json")?{data:await n.json(),requestContext:i}:{data:await n.blob(),requestContext:i}}async function*Ce(e,t,o){let{url:r,info:a}=await Q({...e,stream:!0},t,o),n=await(o?.fetch??fetch)(r,a);if(o?.retry_on_error!==!1&&n.status===503)return yield*Ce(e,t,o);if(!n.ok){if(n.headers.get("Content-Type")?.startsWith("application/json")){let c=await n.json();if([400,422,404,500].includes(n.status)&&o?.chatCompletion)throw new L(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(c.error)}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c});if(typeof c.error=="string")throw new L(`Failed to perform inference: ${c.error}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c});if(c.error&&"message"in c.error&&typeof c.error.message=="string")throw new L(`Failed to perform inference: ${c.error.message}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c});if(typeof c.message=="string")throw new L(`Failed to perform inference: ${c.message}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:c})}throw new L("Failed to perform inference: an HTTP error occurred when requesting the provider.",{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:""})}if(!n.headers.get("content-type")?.startsWith("text/event-stream"))throw new L("Failed to perform inference: server does not support event stream content type, it returned "+n.headers.get("content-type"),{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:""});if(!n.body)return;let i=n.body.getReader(),s=[],p=oa(ra(()=>{},()=>{},c=>{s.push(c)}));try{for(;;){let{done:c,value:l}=await i.read();if(c)return;p(l);for(let u of s)if(u.data.length>0){if(u.data==="[DONE]")return;let y=JSON.parse(u.data);if(typeof y=="object"&&y!==null&&"error"in y){let E=typeof y.error=="string"?y.error:typeof y.error=="object"&&y.error&&"message"in y.error&&typeof y.error.message=="string"?y.error.message:JSON.stringify(y.error);throw new L(`Failed to perform inference: an occurred while streaming the response: ${E}`,{url:r,method:a.method??"GET",headers:a.headers,body:ce(a.body)},{requestId:n.headers.get("x-request-id")??"",status:n.status,body:y})}yield y}s=[]}}finally{i.releaseLock()}}async function Zl(e,t){ye().warn("The request method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.");let r=await _(e.provider,e.model,e.endpointUrl,t),a=b(r,t?.task);return(await v(e,a,t)).data}async function*ep(e,t){ye().warn("The streamingRequest method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.");let r=await _(e.provider,e.model,e.endpointUrl,t),a=b(r,t?.task);yield*Ce(e,a,t)}function aa(e){return"data"in e?e:{...w(e,"inputs"),data:e.inputs}}async function tp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"audio-classification"),a=aa(e),{data:n}=await v(a,r,{...t,task:"audio-classification"});return r.getResponse(n)}async function op(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"audio-to-audio"),a=await r.preparePayloadAsync(e),{data:n}=await v(a,r,{...t,task:"audio-to-audio"}),{url:i,info:s}=await Q(e,r,{...t,task:"audio-to-audio"});return r.getResponse(n,i,s.headers,void 0,t?.signal)}async function rp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"automatic-speech-recognition"),a=await r.preparePayloadAsync(e),{data:n}=await v(a,r,{...t,task:"automatic-speech-recognition"});return r.getResponse(n,void 0,void 0,void 0,t?.signal)}async function ap(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-to-audio"),{data:a}=await v(e,r,{...t,task:"text-to-audio"}),{url:n,info:i}=await Q(e,r,{...t,task:"text-to-audio"});return r.getResponse(a,n,i.headers,void 0,t?.signal)}async function np(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-to-speech"),{data:a}=await v(e,r,{...t,task:"text-to-speech"});return r.getResponse(a,void 0,void 0,void 0,t?.signal)}function zo(e){return"data"in e?e:{...w(e,"inputs"),data:e.inputs}}async function ip(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-classification"),a=zo(e),{data:n}=await v(a,r,{...t,task:"image-classification"});return r.getResponse(n)}async function sp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-segmentation"),a=await r.preparePayloadAsync(e),{data:n}=await v(a,r,{...t,task:"image-segmentation"}),{url:i,info:s}=await Q(e,r,{...t,task:"image-segmentation"});return r.getResponse(n,i,s.headers,void 0,t?.signal)}async function lp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-to-image"),a=await r.preparePayloadAsync(e),{data:n}=await v(a,r,{...t,task:"image-to-image"}),{url:i,info:s}=await Q(e,r,{...t,task:"image-to-image"});return r.getResponse(n,i,s.headers,void 0,t?.signal)}async function pp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-to-text"),a=await r.preparePayloadAsync(e,t?.signal),{data:n}=await v(a,r,{...t,task:"image-to-text"});return r.getResponse(n)}async function cp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-to-video"),a=await r.preparePayloadAsync(e),{data:n}=await v(a,r,{...t,task:"image-to-video"}),{url:i,info:s}=await Q(e,r,{...t,task:"image-to-video"});return r.getResponse(n,i,s.headers,void 0,t?.signal)}async function dp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-text-to-image"),a=await r.preparePayloadAsync(e),{data:n,requestContext:i}=await v(a,r,{...t,task:"image-text-to-image"});return r.getResponse(n,i.url,i.info.headers,void 0,t?.signal)}async function mp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"image-text-to-video"),a=await r.preparePayloadAsync(e),{data:n,requestContext:i}=await v(a,r,{...t,task:"image-text-to-video"});return r.getResponse(n,i.url,i.info.headers,void 0,t?.signal)}async function up(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"object-detection"),a=zo(e),{data:n}=await v(a,r,{...t,task:"object-detection"});return r.getResponse(n)}async function fp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-to-image"),{data:a}=await v(e,r,{...t,task:"text-to-image"}),{url:n,info:i}=await Q(e,r,{...t,task:"text-to-image"});return r.getResponse(a,n,i.headers,t?.outputType,t?.signal)}async function gp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-to-video"),{data:a}=await v(e,r,{...t,task:"text-to-video"}),{url:n,info:i}=await Q(e,r,{...t,task:"text-to-video"});return r.getResponse(a,n,i.headers,void 0,t?.signal)}async function hp(e){return e.inputs instanceof Blob?{...e,inputs:{image:$(new Uint8Array(await e.inputs.arrayBuffer()))}}:{...e,inputs:{image:$(new Uint8Array(e.inputs.image instanceof ArrayBuffer?e.inputs.image:await e.inputs.image.arrayBuffer()))}}}async function yp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"zero-shot-image-classification"),a=await hp(e),{data:n}=await v(a,r,{...t,task:"zero-shot-image-classification"});return r.getResponse(n)}async function bp(e,t){let o;if(e.endpointUrl){let a=await _(e.provider,e.model,e.endpointUrl,t);o=b(a,"conversational")}else if(!e.provider||e.provider==="auto")o=new je;else{let a=await _(e.provider,e.model,e.endpointUrl,t);o=b(a,"conversational")}let{data:r}=await v(e,o,{...t,task:"conversational"});return o.getResponse(r)}async function*wp(e,t){let o;if(e.endpointUrl){let r=await _(e.provider,e.model,e.endpointUrl,t);o=b(r,"conversational")}else if(!e.provider||e.provider==="auto")o=new je;else{let r=await _(e.provider,e.model,e.endpointUrl,t);o=b(r,"conversational")}yield*Ce(e,o,{...t,task:"conversational"})}async function _p(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"feature-extraction"),{data:a}=await v(e,r,{...t,task:"feature-extraction"});return r.getResponse(a)}async function vp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"fill-mask"),{data:a}=await v(e,r,{...t,task:"fill-mask"});return r.getResponse(a)}async function xp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"question-answering"),{data:a}=await v(e,r,{...t,task:"question-answering"});return r.getResponse(a)}async function Ap(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"sentence-similarity"),{data:a}=await v(e,r,{...t,task:"sentence-similarity"});return r.getResponse(a)}async function kp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-ranking"),{data:a}=await v(e,r,{...t,task:"text-ranking"});return r.getResponse(a)}async function Ip(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"summarization"),{data:a}=await v(e,r,{...t,task:"summarization"});return r.getResponse(a)}async function Tp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"table-question-answering"),{data:a}=await v(e,r,{...t,task:"table-question-answering"});return r.getResponse(a)}async function Sp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-classification"),{data:a}=await v(e,r,{...t,task:"text-classification"});return r.getResponse(a)}async function Rp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-generation"),{data:a}=await v(e,r,{...t,task:"text-generation"});return r.getResponse(a)}async function*Ep(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"text-generation");yield*Ce(e,r,{...t,task:"text-generation"})}async function Pp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"token-classification"),{data:a}=await v(e,r,{...t,task:"token-classification"});return r.getResponse(a)}async function Cp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"translation"),{data:a}=await v(e,r,{...t,task:"translation"});return r.getResponse(a)}async function Lp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"zero-shot-classification"),{data:a}=await v(e,r,{...t,task:"zero-shot-classification"});return r.getResponse(a)}async function Up(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"document-question-answering"),a={...e,inputs:{question:e.inputs.question,image:$(new Uint8Array(await e.inputs.image.arrayBuffer()))}},{data:n}=await v(a,r,{...t,task:"document-question-answering"});return r.getResponse(n)}async function Mp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"visual-question-answering"),a={...e,inputs:{question:e.inputs.question,image:$(new Uint8Array(await e.inputs.image.arrayBuffer()))}},{data:n}=await v(a,r,{...t,task:"visual-question-answering"});return r.getResponse(n)}async function Op(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"tabular-classification"),{data:a}=await v(e,r,{...t,task:"tabular-classification"});return r.getResponse(a)}async function Dp(e,t){let o=await _(e.provider,e.model,e.endpointUrl,t),r=b(o,"tabular-regression"),{data:a}=await v(e,r,{...t,task:"tabular-regression"});return r.getResponse(a)}function na(e){return Object.entries(e)}var ot=class e{accessToken;defaultOptions;constructor(t="",o={}){this.accessToken=t,this.defaultOptions=o;for(let[r,a]of na(cr))Object.defineProperty(this,r,{enumerable:!1,value:(n,i)=>a({endpointUrl:o.endpointUrl,accessToken:t,...n},{...w(o,["endpointUrl"]),...i})})}endpoint(t){return new e(this.accessToken,{...this.defaultOptions,endpointUrl:t})}};var Np=["baseten","cerebras","cohere","deepinfra","fal-ai","featherless-ai","fireworks-ai","groq","hf-inference","humain-ai","novita","nscale","openai","openrouter","ovhcloud","publicai","replicate","scaleway","together","wavespeed","zai-org"],Cw=[...Np,"auto"];var $p=Object.defineProperty,jp=(e,t,o)=>t in e?$p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,qp=(e,t,o)=>(jp(e,typeof t!="symbol"?t+"":t,o),o),m=Object.freeze({Text:"Text",NumericLiteral:"NumericLiteral",StringLiteral:"StringLiteral",Identifier:"Identifier",Equals:"Equals",OpenParen:"OpenParen",CloseParen:"CloseParen",OpenStatement:"OpenStatement",CloseStatement:"CloseStatement",OpenExpression:"OpenExpression",CloseExpression:"CloseExpression",OpenSquareBracket:"OpenSquareBracket",CloseSquareBracket:"CloseSquareBracket",OpenCurlyBracket:"OpenCurlyBracket",CloseCurlyBracket:"CloseCurlyBracket",Comma:"Comma",Dot:"Dot",Colon:"Colon",Pipe:"Pipe",CallOperator:"CallOperator",AdditiveBinaryOperator:"AdditiveBinaryOperator",MultiplicativeBinaryOperator:"MultiplicativeBinaryOperator",ExponentiationBinaryOperator:"ExponentiationBinaryOperator",ComparisonBinaryOperator:"ComparisonBinaryOperator",UnaryOperator:"UnaryOperator",Comment:"Comment"}),se=class{constructor(e,t){this.value=e,this.type=t}};function ia(e){return/\w/.test(e)}function Le(e){return/[0-9]/.test(e)}function sa(e){return/\s/.test(e)}var Bp=[["{%",m.OpenStatement],["%}",m.CloseStatement],["{{",m.OpenExpression],["}}",m.CloseExpression],["(",m.OpenParen],[")",m.CloseParen],["{",m.OpenCurlyBracket],["}",m.CloseCurlyBracket],["[",m.OpenSquareBracket],["]",m.CloseSquareBracket],[",",m.Comma],[".",m.Dot],[":",m.Colon],["|",m.Pipe],["<=",m.ComparisonBinaryOperator],[">=",m.ComparisonBinaryOperator],["==",m.ComparisonBinaryOperator],["!=",m.ComparisonBinaryOperator],["<",m.ComparisonBinaryOperator],[">",m.ComparisonBinaryOperator],["+",m.AdditiveBinaryOperator],["-",m.AdditiveBinaryOperator],["~",m.AdditiveBinaryOperator],["**",m.ExponentiationBinaryOperator],["*",m.MultiplicativeBinaryOperator],["//",m.MultiplicativeBinaryOperator],["/",m.MultiplicativeBinaryOperator],["%",m.MultiplicativeBinaryOperator],["=",m.Equals]],Fp=new Map([["n",`
`],["t","	"],["r","\r"],["b","\b"],["f","\f"],["v","\v"],["'","'"],['"','"'],["\\","\\"]]);function Vp(e,t={}){return e.endsWith(`
`)&&(e=e.slice(0,-1)),t.lstrip_blocks&&(e=e.replace(/^[ \t]*({[#%-])/gm,"$1")),t.trim_blocks&&(e=e.replace(/([#%-]})\n/g,"$1")),e.replace(/(\s*){%(-?)\s*(?:end)?generation\s*(-?)%}(\s*)/gs,(o,r,a,n,i)=>(a?"":r)+(n?"":i))}function Hp(e,t={}){let o=[],r=Vp(e,t),a=0,n=0,i=p=>{let c="";for(;p(r[a]);){if(r[a]==="\\"){if(++a,a>=r.length)throw new SyntaxError("Unexpected end of input");let l=r[a++];if(l==="x"||l==="u"){let y=l==="x"?2:4,E=r.slice(a,a+y);if(E.length!==y||/[^0-9a-f]/i.test(E))throw new SyntaxError(`Invalid hexadecimal escape sequence: \\${l}${E}`);c+=String.fromCharCode(parseInt(E,16)),a+=y;continue}let u=Fp.get(l);if(u===void 0)throw new SyntaxError(`Unexpected escaped character: ${l}`);c+=u;continue}if(c+=r[a++],a>=r.length)throw new SyntaxError("Unexpected end of input")}return c},s=()=>{let p=o.at(-1);p&&p.type===m.Text&&(p.value=p.value.trimEnd(),p.value===""&&o.pop())},d=()=>{for(;a<r.length&&sa(r[a]);)++a};e:for(;a<r.length;){let p=o.at(-1)?.type;if(p===void 0||p===m.CloseStatement||p===m.CloseExpression||p===m.Comment){let l="";for(;a<r.length&&!(r[a]==="{"&&(r[a+1]==="%"||r[a+1]==="{"||r[a+1]==="#"));)l+=r[a++];if(l.length>0){o.push(new se(l,m.Text));continue}}if(r[a]==="{"&&r[a+1]==="#"){a+=2;let l=r[a]==="-";l&&++a;let u="";for(;r[a]!=="#"||r[a+1]!=="}";){if(a+2>=r.length)throw new SyntaxError("Missing end of comment tag");u+=r[a++]}let y=u.endsWith("-");y&&(u=u.slice(0,-1)),l&&s(),o.push(new se(u,m.Comment)),a+=2,y&&d();continue}if(r.slice(a,a+3)==="{%-"){s(),o.push(new se("{%",m.OpenStatement)),a+=3;continue}if(r.slice(a,a+3)==="{{-"){s(),o.push(new se("{{",m.OpenExpression)),n=0,a+=3;continue}if(i(sa),r.slice(a,a+3)==="-%}"){o.push(new se("%}",m.CloseStatement)),a+=3,d();continue}if(r.slice(a,a+3)==="-}}"){o.push(new se("}}",m.CloseExpression)),a+=3,d();continue}let c=r[a];if(c==="-"||c==="+"){let l=o.at(-1)?.type;if(l===m.Text||l===void 0)throw new SyntaxError(`Unexpected character: ${c}`);switch(l){case m.Identifier:case m.NumericLiteral:case m.StringLiteral:case m.CloseParen:case m.CloseSquareBracket:break;default:{++a;let u=i(Le);if(u.length>0&&r[a]==="."&&Le(r[a+1])){++a;let y=i(Le);u=`${u}.${y}`}o.push(new se(`${c}${u}`,u.length>0?m.NumericLiteral:m.UnaryOperator));continue}}}for(let[l,u]of Bp){if(l==="}}"&&n>0)continue;if(r.slice(a,a+l.length)===l){o.push(new se(l,u)),u===m.OpenExpression?n=0:u===m.OpenCurlyBracket?++n:u===m.CloseCurlyBracket&&--n,a+=l.length;continue e}}if(c==="'"||c==='"'){++a;let l=i(u=>u!==c);o.push(new se(l,m.StringLiteral)),++a;continue}if(Le(c)){let l=i(Le);if(o.at(-1)?.type!==m.Dot&&r[a]==="."&&Le(r[a+1])){++a;let u=i(Le);l=`${l}.${u}`}o.push(new se(l,m.NumericLiteral));continue}if(ia(c)){let l=i(ia);o.push(new se(l,m.Identifier));continue}throw new SyntaxError(`Unexpected character: ${c}`)}return o}var le=class{type="Statement"},Xp=class extends le{constructor(e){super(),this.body=e}type="Program"},Yp=class extends le{constructor(e,t,o){super(),this.test=e,this.body=t,this.alternate=o}type="If"},zp=class extends le{constructor(e,t,o,r){super(),this.loopvar=e,this.iterable=t,this.body=o,this.defaultBlock=r}type="For"},Wp=class extends le{type="Break"},Kp=class extends le{type="Continue"},Qp=class extends le{constructor(e,t,o){super(),this.assignee=e,this.value=t,this.body=o}type="Set"},Jp=class extends le{constructor(e,t,o){super(),this.name=e,this.args=t,this.body=o}type="Macro"},Gp=class extends le{constructor(e){super(),this.value=e}type="Comment"},re=class extends le{type="Expression"},Zp=class extends re{constructor(e,t,o){super(),this.object=e,this.property=t,this.computed=o}type="MemberExpression"},la=class extends re{constructor(e,t){super(),this.callee=e,this.args=t}type="CallExpression"},ve=class extends re{constructor(e){super(),this.value=e}type="Identifier"},Ve=class extends re{constructor(e){super(),this.value=e}type="Literal"},ec=class extends Ve{type="IntegerLiteral"},tc=class extends Ve{type="FloatLiteral"},pa=class extends Ve{type="StringLiteral"},oc=class extends Ve{type="ArrayLiteral"},ca=class extends Ve{type="TupleLiteral"},rc=class extends Ve{type="ObjectLiteral"},Fe=class extends re{constructor(e,t,o){super(),this.operator=e,this.left=t,this.right=o}type="BinaryExpression"},ac=class extends re{constructor(e,t){super(),this.operand=e,this.filter=t}type="FilterExpression"},nc=class extends le{constructor(e,t){super(),this.filter=e,this.body=t}type="FilterStatement"},ic=class extends re{constructor(e,t){super(),this.lhs=e,this.test=t}type="SelectExpression"},sc=class extends re{constructor(e,t,o){super(),this.operand=e,this.negate=t,this.test=o}type="TestExpression"},da=class extends re{constructor(e,t){super(),this.operator=e,this.argument=t}type="UnaryExpression"},lc=class extends re{constructor(e=void 0,t=void 0,o=void 0){super(),this.start=e,this.stop=t,this.step=o}type="SliceExpression"},dr=class extends re{constructor(e,t){super(),this.key=e,this.value=t}type="KeywordArgumentExpression"},pc=class extends re{constructor(e){super(),this.argument=e}type="SpreadExpression"},cc=class extends re{constructor(e){super(),this.argument=e}type="KeywordSpreadExpression"},dc=class extends le{constructor(e,t,o){super(),this.call=e,this.callerArgs=t,this.body=o}type="CallStatement"},mc=class extends re{constructor(e,t,o){super(),this.condition=e,this.trueExpr=t,this.falseExpr=o}type="Ternary"};function uc(e){let t=new Xp([]),o=0;function r(f,h){let A=e[o++];if(!A||A.type!==f)throw new Error(`Parser Error: ${h}. ${A.type} !== ${f}.`);return A}function a(f){if(!d(f))throw new SyntaxError(`Expected ${f}`);++o}function n(){switch(e[o].type){case m.Comment:return new Gp(e[o++].value);case m.Text:return p();case m.OpenStatement:return c();case m.OpenExpression:return l();default:throw new SyntaxError(`Unexpected token type: ${e[o].type}`)}}function i(...f){return o+f.length<=e.length&&f.every((h,A)=>h===e[o+A].type)}function s(...f){return e[o]?.type===m.OpenStatement&&e[o+1]?.type===m.Identifier&&f.includes(e[o+1]?.value)}function d(...f){return o+f.length<=e.length&&f.every((h,A)=>e[o+A].type==="Identifier"&&h===e[o+A].value)}function p(){return new pa(r(m.Text,"Expected text token").value)}function c(){if(r(m.OpenStatement,"Expected opening statement token"),e[o].type!==m.Identifier)throw new SyntaxError(`Unknown statement, got ${e[o].type}`);let f=e[o].value,h;switch(f){case"set":++o,h=u();break;case"if":++o,h=y(),r(m.OpenStatement,"Expected {% token"),a("endif"),r(m.CloseStatement,"Expected %} token");break;case"macro":++o,h=E(),r(m.OpenStatement,"Expected {% token"),a("endmacro"),r(m.CloseStatement,"Expected %} token");break;case"for":++o,h=F(),r(m.OpenStatement,"Expected {% token"),a("endfor"),r(m.CloseStatement,"Expected %} token");break;case"call":{++o;let A=null;i(m.OpenParen)&&(A=De("parameters"));let Y=_e();if(Y.type!=="Identifier")throw new SyntaxError("Expected identifier following call statement");let Ye=De("call");r(m.CloseStatement,"Expected closing statement token");let ze=[];for(;!s("endcall");)ze.push(n());r(m.OpenStatement,"Expected '{%'"),a("endcall"),r(m.CloseStatement,"Expected closing statement token");let at=new la(Y,Ye);h=new dc(at,A,ze);break}case"break":++o,r(m.CloseStatement,"Expected closing statement token"),h=new Wp;break;case"continue":++o,r(m.CloseStatement,"Expected closing statement token"),h=new Kp;break;case"filter":{++o;let A=_e();A instanceof ve&&i(m.OpenParen)&&(A=Oe(A)),r(m.CloseStatement,"Expected closing statement token");let Y=[];for(;!s("endfilter");)Y.push(n());r(m.OpenStatement,"Expected '{%'"),a("endfilter"),r(m.CloseStatement,"Expected '%}'"),h=new nc(A,Y);break}default:throw new SyntaxError(`Unknown statement type: ${f}`)}return h}function l(){r(m.OpenExpression,"Expected opening expression token");let f=j();return r(m.CloseExpression,"Expected closing expression token"),f}function u(){let f=N(),h=null,A=[];if(i(m.Equals))++o,h=N();else{for(r(m.CloseStatement,"Expected %} token");!s("endset");)A.push(n());r(m.OpenStatement,"Expected {% token"),a("endset")}return r(m.CloseStatement,"Expected closing statement token"),new Qp(f,h,A)}function y(){let f=j();r(m.CloseStatement,"Expected closing statement token");let h=[],A=[];for(;!s("elif","else","endif");)h.push(n());if(s("elif")){++o,++o;let Y=y();A.push(Y)}else if(s("else"))for(++o,++o,r(m.CloseStatement,"Expected closing statement token");!s("endif");)A.push(n());return new Yp(f,h,A)}function E(){let f=_e();if(f.type!=="Identifier")throw new SyntaxError("Expected identifier following macro statement");let h=De("parameters");r(m.CloseStatement,"Expected closing statement token");let A=[];for(;!s("endmacro");)A.push(n());return new Jp(f,h,A)}function N(f=!1){let h=f?_e:j,A=[h()],Y=i(m.Comma);for(;Y&&(++o,A.push(h()),!!i(m.Comma)););return Y?new ca(A):A[0]}function F(){let f=N(!0);if(!(f instanceof ve||f instanceof ca))throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${f.type} instead`);if(!d("in"))throw new SyntaxError("Expected `in` keyword following loop variable");++o;let h=j();r(m.CloseStatement,"Expected closing statement token");let A=[];for(;!s("endfor","else");)A.push(n());let Y=[];if(s("else"))for(++o,++o,r(m.CloseStatement,"Expected closing statement token");!s("endfor");)Y.push(n());return new zp(f,h,A,Y)}function j(){return ge()}function ge(){let f=te();if(d("if")){++o;let h=te();if(d("else")){++o;let A=ge();return new mc(h,f,A)}else return new ic(f,h)}return f}function te(){let f=Te();for(;d("or");){let h=e[o];++o;let A=Te();f=new Fe(h,f,A)}return f}function Te(){let f=oe();for(;d("and");){let h=e[o];++o;let A=oe();f=new Fe(h,f,A)}return f}function oe(){let f;for(;d("not");){let h=e[o];++o;let A=oe();f=new da(h,A)}return f??Xe()}function Xe(){let f=G();for(;;){let h;if(d("not","in"))h=new se("not in",m.Identifier),o+=2;else if(d("in"))h=e[o++];else if(i(m.ComparisonBinaryOperator))h=e[o++];else break;let A=G();f=new Fe(h,f,A)}return f}function G(){let f=Er();for(;i(m.AdditiveBinaryOperator);){let h=e[o];++o;let A=Er();f=new Fe(h,f,A)}return f}function we(){let f=Rr(_e());return i(m.OpenParen)?Oe(f):f}function Oe(f){let h=new la(f,De("call"));return h=Rr(h),i(m.OpenParen)&&(h=Oe(h)),h}function De(f){r(m.OpenParen,"Expected opening parenthesis for arguments list");let h=tl(f);return r(m.CloseParen,"Expected closing parenthesis for arguments list"),h}function tl(f){let h=[],A=new Set,Y=!1,Ye=!1;for(;!i(m.CloseParen);){let ze=i(m.ExponentiationBinaryOperator),at=i(m.MultiplicativeBinaryOperator)&&e[o].value==="*";if(f==="parameters"&&(ze||at))throw new SyntaxError("Argument unpacking is not allowed in parameter declarations");if(ze){if(++o,h.push(new cc(j())),i(m.Comma)&&++o,!i(m.CloseParen))throw new SyntaxError("Expected closing parenthesis: `**` must be applied to the final argument");break}let ie;if(at){if(Ye)throw new SyntaxError("Only one `*` argument unpacking is allowed");Ye=!0,++o;let Se=j();ie=new pc(Se)}else{if(ie=j(),i(m.Equals)){if(++o,!(ie instanceof ve))throw new SyntaxError(f==="parameters"?"Expected identifier for parameter declaration":"Expected identifier for keyword argument");let Se=j();ie=new dr(ie,Se)}if(f==="parameters"){if(!(ie instanceof ve||ie instanceof dr))throw new SyntaxError("Expected identifier for parameter declaration");let Se=ie instanceof ve?ie.value:ie.key.value;if(A.has(Se))throw new SyntaxError(`Duplicate parameter name: ${Se}`);A.add(Se)}if(ie instanceof dr)Y=!0;else{if(Y)throw new SyntaxError(f==="call"?"Positional arguments must come before keyword arguments":"Non-default argument follows default argument");if(Ye)throw new SyntaxError("Positional arguments must not follow `*` argument unpacking")}}h.push(ie),i(m.Comma)&&++o}return h}function ol(){let f=[],h=!1;for(;!i(m.CloseSquareBracket);)i(m.Colon)?(f.push(void 0),++o,h=!0):(f.push(j()),i(m.Colon)&&(++o,h=!0));if(f.length===0)throw new SyntaxError("Expected at least one argument for member/slice expression");if(h){if(f.length>3)throw new SyntaxError("Expected 0-3 arguments for slice expression");return new lc(...f)}return f[0]}function Rr(f){for(;i(m.Dot)||i(m.OpenSquareBracket);){let h=e[o];++o;let A,Y=h.type===m.OpenSquareBracket;if(Y)A=ol(),r(m.CloseSquareBracket,"Expected closing square bracket");else if(A=_e(),A.type!=="Identifier"&&A.type!=="IntegerLiteral")throw new SyntaxError("Expected identifier or integer following dot operator");f=new Zp(f,A,Y)}return f}function Er(){let f=Pr();for(;i(m.MultiplicativeBinaryOperator);){let h=e[o++],A=Pr();f=new Fe(h,f,A)}return f}function Pr(){let f=Cr();for(;i(m.ExponentiationBinaryOperator);){let h=e[o++],A=Cr();f=new Fe(h,f,A)}return f}function Cr(){let f=rl();for(;d("is");){++o;let h=d("not");h&&++o;let A=_e();if(!(A instanceof ve))throw new SyntaxError("Expected identifier for the test");f=new sc(f,h,A)}return f}function rl(){let f=Lr();for(;i(m.Pipe);){++o;let h=_e();if(!(h instanceof ve))throw new SyntaxError("Expected identifier for the filter");i(m.OpenParen)&&(h=Oe(h)),f=new ac(f,h)}return f}function Lr(){let f=e[o];if(f&&(f.type===m.UnaryOperator||f.type===m.AdditiveBinaryOperator)&&(f.value==="-"||f.value==="+")){let h=e[o++],A=Lr();return new da(h,A)}return we()}function _e(){let f=e[o++];switch(f.type){case m.NumericLiteral:{let h=f.value;return h.includes(".")?new tc(Number(h)):new ec(Number(h))}case m.StringLiteral:{let h=f.value;for(;i(m.StringLiteral);)h+=e[o++].value;return new pa(h)}case m.Identifier:return new ve(f.value);case m.OpenParen:{let h=N();return r(m.CloseParen,"Expected closing parenthesis, got ${tokens[current].type} instead."),h}case m.OpenSquareBracket:{let h=[];for(;!i(m.CloseSquareBracket);)h.push(j()),i(m.Comma)&&++o;return++o,new oc(h)}case m.OpenCurlyBracket:{let h=new Map;for(;!i(m.CloseCurlyBracket);){let A=j();r(m.Colon,"Expected colon between key and value in object literal");let Y=j();h.set(A,Y),i(m.Comma)&&++o}return++o,new rc(h)}default:throw new SyntaxError(`Unexpected token: ${f.type}`)}}for(;o<e.length;)t.body.push(n());return t}function fc(e,t,o=1){if(t===void 0&&(t=e,e=0),o===0)throw new Error("range() step must not be zero");let r=[];if(o>0)for(let a=e;a<t;a+=o)r.push(a);else for(let a=e;a>t;a+=o)r.push(a);return r}function ma(e,t,o,r=1){let a=Math.sign(r);a>=0?(t=(t??=0)<0?Math.max(e.length+t,0):Math.min(t,e.length),o=(o??=e.length)<0?Math.max(e.length+o,0):Math.min(o,e.length)):(t=(t??=e.length-1)<0?Math.max(e.length+t,-1):Math.min(t,e.length-1),o=(o??=-1)<-1?Math.max(e.length+o,-1):Math.min(o,e.length-1));let n=[];for(let i=t;a*i<a*o;i+=r)n.push(e[i]);return n}function gc(e){return e.replace(/\b\w/g,t=>t.toUpperCase())}function hc(e){return yc(new Date,e)}function yc(e,t){let o=new Intl.DateTimeFormat(void 0,{month:"long"}),r=new Intl.DateTimeFormat(void 0,{month:"short"}),a=n=>n<10?"0"+n:n.toString();return t.replace(/%[YmdbBHM%]/g,n=>{switch(n){case"%Y":return e.getFullYear().toString();case"%m":return a(e.getMonth()+1);case"%d":return a(e.getDate());case"%b":return r.format(e);case"%B":return o.format(e);case"%H":return a(e.getHours());case"%M":return a(e.getMinutes());case"%%":return"%";default:return n}})}function bc(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wc(e,t,o,r){if(r===0)return e;let a=r==null||r<0?1/0:r,n=t.length===0?new RegExp("(?=)","gu"):new RegExp(bc(t),"gu");return e.replaceAll(n,i=>a>0?(--a,o):i)}var ua=class extends Error{},fa=class extends Error{},_c=new Map,ue=class{type="RuntimeValue";value;get builtins(){return _c}constructor(e=void 0){this.value=e}__bool__(){return new I(!!this.value)}toString(){return String(this.value)}},S=class extends ue{type="IntegerValue"},D=class extends ue{type="FloatValue";toString(){return Object.is(this.value,-0)?"-0.0":this.value%1===0?this.value.toFixed(1):this.value.toString()}},x=class extends ue{type="StringValue";_builtins;get builtins(){return this._builtins??=new Map([["upper",new B(()=>new x(this.value.toUpperCase()))],["lower",new B(()=>new x(this.value.toLowerCase()))],["strip",new B(()=>new x(this.value.trim()))],["title",new B(()=>new x(gc(this.value)))],["capitalize",new B(()=>new x(this.value.charAt(0).toUpperCase()+this.value.slice(1)))],["length",new S(this.value.length)],["rstrip",new B(()=>new x(this.value.trimEnd()))],["lstrip",new B(()=>new x(this.value.trimStart()))],["startswith",new B(e=>{if(e.length===0)throw new Error("startswith() requires at least one argument");let t=e[0];if(t instanceof x)return new I(this.value.startsWith(t.value));if(t instanceof P){for(let o of t.value){if(!(o instanceof x))throw new Error("startswith() tuple elements must be strings");if(this.value.startsWith(o.value))return new I(!0)}return new I(!1)}throw new Error("startswith() argument must be a string or tuple of strings")})],["endswith",new B(e=>{if(e.length===0)throw new Error("endswith() requires at least one argument");let t=e[0];if(t instanceof x)return new I(this.value.endsWith(t.value));if(t instanceof P){for(let o of t.value){if(!(o instanceof x))throw new Error("endswith() tuple elements must be strings");if(this.value.endsWith(o.value))return new I(!0)}return new I(!1)}throw new Error("endswith() argument must be a string or tuple of strings")})],["split",new B(e=>{let t=e[0]??new V;if(!(t instanceof x||t instanceof V))throw new Error("sep argument must be a string or null");let o=e[1]??new S(-1);if(!(o instanceof S))throw new Error("maxsplit argument must be a number");let r=[];if(t instanceof V){let a=this.value.trimStart();for(let{0:n,index:i}of a.matchAll(/\S+/g)){if(o.value!==-1&&r.length>=o.value&&i!==void 0){r.push(n+a.slice(i+n.length));break}r.push(n)}}else{if(t.value==="")throw new Error("empty separator");r=this.value.split(t.value),o.value!==-1&&r.length>o.value&&r.push(r.splice(o.value).join(t.value))}return new P(r.map(a=>new x(a)))})],["replace",new B(e=>{if(e.length<2)throw new Error("replace() requires at least two arguments");let t=e[0],o=e[1];if(!(t instanceof x&&o instanceof x))throw new Error("replace() arguments must be strings");let r;if(e.length>2?e[2].type==="KeywordArgumentsValue"?r=e[2].value.get("count")??new V:r=e[2]:r=new V,!(r instanceof S||r instanceof V))throw new Error("replace() count argument must be a number or null");return new x(wc(this.value,t.value,o.value,r.value))})]])}},I=class extends ue{type="BooleanValue"},vc=/[\x7f-\uffff]/g;function ga(e){return e.replace(vc,t=>"\\u"+t.charCodeAt(0).toString(16).padStart(4,"0"))}function Ae(e,t={},o=0,r=!0){let{indent:a=null,ensureAscii:n=!1,separators:i=null,sortKeys:s=!1}=t,d,p;switch(i?[d,p]=i:a?(d=",",p=": "):(d=", ",p=": "),e.type){case"NullValue":return"null";case"UndefinedValue":return r?"null":"undefined";case"IntegerValue":case"FloatValue":case"BooleanValue":return JSON.stringify(e.value);case"StringValue":{let c=JSON.stringify(e.value);return n&&(c=ga(c)),c}case"ArrayValue":case"NamespaceValue":case"ObjectValue":{let c=a?" ".repeat(a):"",l=`
`+c.repeat(o),u=l+c;if(e.type==="ArrayValue"){let y=e.value.map(E=>Ae(E,t,o+1,r));return a&&y.length>0?`[${u}${y.join(`${d}${u}`)}${l}]`:`[${y.join(d)}]`}else{let y=Array.from(e.value.entries());s&&(y=y.sort(([N],[F])=>N.localeCompare(F)));let E=y.map(([N,F])=>{let j=JSON.stringify(N);n&&(j=ga(j));let ge=`${j}${p}${Ae(F,t,o+1,r)}`;return a?`${u}${ge}`:ge});return a&&E.length>0?`{${E.join(d)}${l}}`:`{${E.join(d)}}`}}default:throw new Error(`Cannot convert to JSON: ${e.type}`)}}var ee=class extends ue{type="ObjectValue";_builtins;__bool__(){return new I(this.value.size>0)}get builtins(){return this._builtins??=new Map([["get",new B(([e,t])=>{if(!(e instanceof x))throw new Error(`Object key must be a string: got ${e.type}`);return this.value.get(e.value)??t??new V})],["items",new B(()=>this.items())],["keys",new B(()=>this.keys())],["values",new B(()=>this.values())],["dictsort",new B(e=>{let t=new Map,o=e.filter(s=>s instanceof Ue?(t=s.value,!1):!0),r=o.at(0)??t.get("case_sensitive")??new I(!1);if(!(r instanceof I))throw new Error("case_sensitive must be a boolean");let a=o.at(1)??t.get("by")??new x("key");if(!(a instanceof x))throw new Error("by must be a string");if(!["key","value"].includes(a.value))throw new Error("by must be either 'key' or 'value'");let n=o.at(2)??t.get("reverse")??new I(!1);if(!(n instanceof I))throw new Error("reverse must be a boolean");let i=Array.from(this.value.entries()).map(([s,d])=>new P([new x(s),d])).sort((s,d)=>{let p=a.value==="key"?0:1,c=s.value[p],l=d.value[p],u=mr(c,l,r.value);return n.value?-u:u});return new P(i)})]])}items(){return new P(Array.from(this.value.entries()).map(([e,t])=>new P([new x(e),t])))}keys(){return new P(Array.from(this.value.keys()).map(e=>new x(e)))}values(){return new P(Array.from(this.value.values()))}toString(){return Ae(this,{},0,!1)}},Ue=class extends ee{type="KeywordArgumentsValue"},fr=class extends ue{type="NamespaceValue";toString(){return Ae(this,{},0,!1)}},P=class extends ue{type="ArrayValue";_builtins;get builtins(){return this._builtins??=new Map([["length",new S(this.value.length)]])}__bool__(){return new I(this.value.length>0)}toString(){return Ae(this,{},0,!1)}},ha=class extends P{type="TupleValue"},B=class extends ue{type="FunctionValue"},V=class extends ue{type="NullValue"},q=class extends ue{type="UndefinedValue"};function xc(e){let t;if(e instanceof P?t=e.value:e instanceof x&&(t=Array.from(e.value,a=>new x(a))),!t||t.length!==2)throw new Error("namespace expected an object or an iterable of [key, value] pairs");let[o,r]=t;if(!(o instanceof x))throw new Error("namespace keys must be strings");return[o,r]}var _a=class{constructor(e){this.parent=e}variables=new Map([["namespace",new B(e=>{let t=e.slice(),o;if(t.at(-1)instanceof Ue&&(o=t.pop()),t.length>1)throw new Error(`namespace expected at most 1 argument, got ${t.length}`);let r=new Map;if(t.length===1){let a=t[0];if(a instanceof ee)for(let[n,i]of a.value)r.set(n,i);else if(a instanceof P)for(let n of a.value){let[i,s]=xc(n);r.set(i.value,s)}else throw new Error(`'${a.type}' object is not iterable`)}if(o)for(let[a,n]of o.value)r.set(a,n);return new fr(r)})]]);tests=_a.TESTS;set(e,t){return this.declareVariable(e,Ko(t))}declareVariable(e,t){if(this.variables.has(e))throw new SyntaxError(`Variable already declared: ${e}`);return this.variables.set(e,t),t}setVariable(e,t){return this.variables.set(e,t),t}resolve(e){if(this.variables.has(e))return this;if(this.parent)return this.parent.resolve(e);throw new Error(`Unknown variable: ${e}`)}lookupVariable(e){try{return this.resolve(e).variables.get(e)??new q}catch{return new q}}},xe=_a;qp(xe,"TESTS",new Map([["boolean",e=>e.type==="BooleanValue"],["callable",e=>e instanceof B],["odd",e=>{if(!(e instanceof S))throw new Error(`cannot odd on ${e.type}`);return e.value%2!==0}],["even",e=>{if(!(e instanceof S))throw new Error(`cannot even on ${e.type}`);return e.value%2===0}],["false",e=>e.type==="BooleanValue"&&!e.value],["true",e=>e.type==="BooleanValue"&&e.value],["none",e=>e.type==="NullValue"],["string",e=>e.type==="StringValue"],["number",e=>e instanceof S||e instanceof D],["integer",e=>e instanceof S],["iterable",e=>e.type==="ArrayValue"||e.type==="StringValue"],["mapping",e=>e instanceof ee],["sequence",e=>e instanceof P||e instanceof ee||e instanceof x],["lower",e=>{let t=e.value;return e.type==="StringValue"&&t===t.toLowerCase()}],["upper",e=>{let t=e.value;return e.type==="StringValue"&&t===t.toUpperCase()}],["none",e=>e.type==="NullValue"],["defined",e=>e.type!=="UndefinedValue"],["undefined",e=>e.type==="UndefinedValue"],["equalto",(e,t)=>e.value===t.value],["eq",(e,t)=>e.value===t.value]]));function Ac(e){e.set("false",!1),e.set("true",!0),e.set("none",null),e.set("raise_exception",t=>{throw new Error(t)}),e.set("range",fc),e.set("strftime_now",hc),e.set("True",!0),e.set("False",!1),e.set("None",null)}function Wo(e){return e instanceof ee||e instanceof fr}function Qo(e){return e instanceof S||e instanceof D||e instanceof I}function Jo(e){return e instanceof I?Number(e.value):e.value}function ya(e,t){let o=t.split("."),r=e;for(let a of o)if(Wo(r))r=r.value.get(a)??new q;else if(r instanceof P){let n=parseInt(a,10);if(!isNaN(n)&&n>=0&&n<r.value.length)r=r.value[n];else return new q}else return new q;return r}function mr(e,t,o=!1){if(e instanceof V&&t instanceof V)return 0;if(e instanceof V||t instanceof V)throw new Error(`Cannot compare ${e.type} with ${t.type}`);if(e instanceof q&&t instanceof q)return 0;if(e instanceof q||t instanceof q)throw new Error(`Cannot compare ${e.type} with ${t.type}`);if(Qo(e)&&Qo(t)){let r=Jo(e),a=Jo(t);return r<a?-1:r>a?1:0}if(e.type!==t.type)throw new Error(`Cannot compare different types: ${e.type} and ${t.type}`);if(e.type==="StringValue"){let r=e.value,a=t.value;return o||(r=r.toLowerCase(),a=a.toLowerCase()),r<a?-1:r>a?1:0}else throw new Error(`Cannot compare type: ${e.type}`)}function ur(e){if(e.type==="Identifier")return{name:e.value};let t=e;return{name:t.key.value,defaultValue:t.value}}function ba(e){return e==="kwargs"||e==="varargs"}function wa(e,t){let o=new Set,r=new Set,a=c=>{ba(c)&&o.add(c)},n=c=>{if(c.type==="Identifier")a(c.value);else if(c.type==="TupleLiteral")for(let l of c.value)n(l)},i=c=>{a(ur(c).name)},s=c=>{for(let l of c){let u=ur(l);u.defaultValue&&p(u.defaultValue)}},d=c=>{c.type==="CallExpression"&&p(c.args)},p=c=>{if(Array.isArray(c)){for(let l of c)p(l);return}if(c instanceof Map){for(let[l,u]of c)p(l),p(u);return}if(c instanceof le)switch(c.type){case"For":{let l=c;if(n(l.loopvar),l.iterable.type==="SelectExpression"){let u=l.iterable;p(u.lhs),p(l.body),p(l.defaultBlock),p(u.test);return}p(l.iterable),p(l.body),p(l.defaultBlock);return}case"Set":{let l=c;n(l.assignee),p(l.value),p(l.body);return}case"Macro":{let l=c;for(let u of l.args)i(u);s(l.args),p(l.body);return}case"CallStatement":{let l=c;p(l.call);for(let u of l.callerArgs??[])i(u);s(l.callerArgs??[]),p(l.body);return}case"FilterStatement":{let l=c;p(l.body),d(l.filter);return}case"Identifier":{let l=c.value;ba(l)&&!o.has(l)&&r.add(l);return}case"MemberExpression":{let l=c;p(l.object),l.computed&&p(l.property);return}case"FilterExpression":{let l=c;p(l.operand),d(l.filter);return}case"TestExpression":p(c.operand);return;case"SelectExpression":{let l=c;p(l.test),p(l.lhs);return}case"KeywordArgumentExpression":p(c.value);return;default:for(let l of Object.values(c))p(l)}};for(let c of e)i(c);return p(t),r}var kc=class{global;constructor(e){this.global=e??new xe}run(e){return this.evaluate(e,this.global)}evaluateBinaryExpression(e,t){let o=this.evaluate(e.left,t);switch(e.operator.value){case"and":return o.__bool__().value?this.evaluate(e.right,t):o;case"or":return o.__bool__().value?o:this.evaluate(e.right,t)}let r=this.evaluate(e.right,t);switch(e.operator.value){case"==":return new I(o.value==r.value);case"!=":return new I(o.value!=r.value)}if(o instanceof q||r instanceof q){if(r instanceof q&&["in","not in"].includes(e.operator.value))return new I(e.operator.value==="not in");throw new Error(`Cannot perform operation ${e.operator.value} on undefined values`)}else{if(o instanceof V||r instanceof V)throw new Error("Cannot perform operation on null values");if(e.operator.value==="~")return new x(o.value.toString()+r.value.toString());if(e.operator.value==="**"&&Qo(o)&&Qo(r)){let a=Jo(o),n=Jo(r);if(a===0&&n<0)throw new Error("0.0 cannot be raised to a negative power");let i=a**n;if(!Number.isFinite(i))throw new Error("Exponentiation result is not a finite real number");return o instanceof D||r instanceof D||n<0?new D(i):new S(i)}else if((o instanceof S||o instanceof D)&&(r instanceof S||r instanceof D)){let a=o.value,n=r.value;switch(e.operator.value){case"+":case"-":case"*":{let i=e.operator.value==="+"?a+n:e.operator.value==="-"?a-n:a*n;return o instanceof D||r instanceof D?new D(i):new S(i)}case"/":return new D(a/n);case"//":{let i=Math.floor(a/n);return o instanceof D||r instanceof D?new D(i):new S(i)}case"%":{let i=a%n;return o instanceof D||r instanceof D?new D(i):new S(i)}case"<":return new I(a<n);case">":return new I(a>n);case">=":return new I(a>=n);case"<=":return new I(a<=n)}}else if(o instanceof P&&r instanceof P){if(e.operator.value==="+")return new P(o.value.concat(r.value))}else if(r instanceof P){let a=r.value.find(n=>n.value===o.value)!==void 0;switch(e.operator.value){case"in":return new I(a);case"not in":return new I(!a)}}}if((o instanceof x||r instanceof x)&&e.operator.value==="+")return new x(o.value.toString()+r.value.toString());if(o instanceof x&&r instanceof x)switch(e.operator.value){case"in":return new I(r.value.includes(o.value));case"not in":return new I(!r.value.includes(o.value))}if(o instanceof x&&r instanceof ee)switch(e.operator.value){case"in":return new I(r.value.has(o.value));case"not in":return new I(!r.value.has(o.value))}throw new SyntaxError(`Unknown operator "${e.operator.value}" between ${o.type} and ${r.type}`)}evaluateArguments(e,t){let o=[],r=new Map,a=(n,i)=>{if(r.has(n))throw new Error(`Got multiple values for keyword argument '${n}'`);r.set(n,i)};for(let n of e)if(n.type==="SpreadExpression"){let i=n,s=this.evaluate(i.argument,t);if(!(s instanceof P))throw new Error(`Cannot unpack non-iterable type: ${s.type}`);for(let d of s.value)o.push(d)}else n.type!=="KeywordArgumentExpression"&&n.type!=="KeywordSpreadExpression"&&o.push(this.evaluate(n,t));for(let n of e)if(n.type==="KeywordArgumentExpression"){let i=n;a(i.key.value,this.evaluate(i.value,t))}else if(n.type==="KeywordSpreadExpression"){let i=n,s=this.evaluate(i.argument,t);if(!(s instanceof ee))throw new Error(`Argument after ** must be a mapping, not ${s.type}`);for(let[d,p]of s.value)a(d,p)}return[o,r]}applyFilter(e,t,o){if(t.type==="Identifier"){let r=t;if(r.value==="safe")return e;if(r.value==="tojson")return new x(Ae(e,{}));if(e instanceof P)switch(r.value){case"list":return e;case"first":return e.value[0];case"last":return e.value[e.value.length-1];case"length":return new S(e.value.length);case"reverse":return new P(e.value.slice().reverse());case"sort":return new P(e.value.slice().sort((a,n)=>mr(a,n,!1)));case"join":return new x(e.value.map(a=>a.value).join(""));case"string":return new x(Ae(e,{},0,!1));case"unique":{let a=new Set,n=[];for(let i of e.value)a.has(i.value)||(a.add(i.value),n.push(i));return new P(n)}default:throw new Error(`Unknown ArrayValue filter: ${r.value}`)}else if(e instanceof x)switch(r.value){case"length":case"upper":case"lower":case"title":case"capitalize":{let a=e.builtins.get(r.value);if(a instanceof B)return a.value([],o);if(a instanceof S)return a;throw new Error(`Unknown StringValue filter: ${r.value}`)}case"trim":return new x(e.value.trim());case"indent":return new x(e.value.split(`
`).map((a,n)=>n===0||a.length===0?a:"    "+a).join(`
`));case"join":case"string":return e;case"int":{let a=parseInt(e.value,10);return new S(isNaN(a)?0:a)}case"float":{let a=parseFloat(e.value);return new D(isNaN(a)?0:a)}default:throw new Error(`Unknown StringValue filter: ${r.value}`)}else if(e instanceof S||e instanceof D)switch(r.value){case"abs":return e instanceof S?new S(Math.abs(e.value)):new D(Math.abs(e.value));case"int":return new S(Math.floor(e.value));case"float":return new D(e.value);case"string":return new x(e.toString());default:throw new Error(`Unknown NumericValue filter: ${r.value}`)}else if(e instanceof ee)switch(r.value){case"items":return new P(Array.from(e.value.entries()).map(([a,n])=>new P([new x(a),n])));case"length":return new S(e.value.size);default:{let a=e.builtins.get(r.value);if(a)return a instanceof B?a.value([],o):a;throw new Error(`Unknown ObjectValue filter: ${r.value}`)}}else if(e instanceof I)switch(r.value){case"bool":return new I(e.value);case"int":return new S(e.value?1:0);case"float":return new D(e.value?1:0);case"string":return new x(e.value?"true":"false");default:throw new Error(`Unknown BooleanValue filter: ${r.value}`)}throw new Error(`Cannot apply filter "${r.value}" to type: ${e.type}`)}else if(t.type==="CallExpression"){let r=t;if(r.callee.type!=="Identifier")throw new Error(`Unknown filter: ${r.callee.type}`);let a=r.callee.value;if(a==="tojson"){let[,n]=this.evaluateArguments(r.args,o),i=n.get("indent")??new V;if(!(i instanceof S||i instanceof V))throw new Error("If set, indent must be a number");let s=n.get("ensure_ascii")??new I(!1);if(!(s instanceof I))throw new Error("If set, ensure_ascii must be a boolean");let d=n.get("sort_keys")??new I(!1);if(!(d instanceof I))throw new Error("If set, sort_keys must be a boolean");let p=n.get("separators")??new V,c=null;if(p instanceof P||p instanceof ha){if(p.value.length!==2)throw new Error("separators must be a tuple of two strings");let[l,u]=p.value;if(!(l instanceof x)||!(u instanceof x))throw new Error("separators must be a tuple of two strings");c=[l.value,u.value]}else if(!(p instanceof V))throw new Error("If set, separators must be a tuple of two strings");return new x(Ae(e,{indent:i.value,ensureAscii:s.value,sortKeys:d.value,separators:c}))}else if(a==="join"){let n;if(e instanceof x)n=Array.from(e.value);else if(e instanceof P)n=e.value.map(p=>p.value);else throw new Error(`Cannot apply filter "${a}" to type: ${e.type}`);let[i,s]=this.evaluateArguments(r.args,o),d=i.at(0)??s.get("separator")??new x("");if(!(d instanceof x))throw new Error("separator must be a string");return new x(n.join(d.value))}else if(a==="int"||a==="float"){let[n,i]=this.evaluateArguments(r.args,o),s=n.at(0)??i.get("default")??(a==="int"?new S(0):new D(0));if(e instanceof x){let d=a==="int"?parseInt(e.value,10):parseFloat(e.value);return isNaN(d)?s:a==="int"?new S(d):new D(d)}else{if(e instanceof S||e instanceof D)return e;if(e instanceof I)return a==="int"?new S(e.value?1:0):new D(e.value?1:0);throw new Error(`Cannot apply filter "${a}" to type: ${e.type}`)}}else if(a==="default"){let[n,i]=this.evaluateArguments(r.args,o),s=n[0]??new x(""),d=n[1]??i.get("boolean")??new I(!1);if(!(d instanceof I))throw new Error("`default` filter flag must be a boolean");return e instanceof q||d.value&&!e.__bool__().value?s:e}if(e instanceof P){switch(a){case"sort":{let[n,i]=this.evaluateArguments(r.args,o),s=n.at(0)??i.get("reverse")??new I(!1);if(!(s instanceof I))throw new Error("reverse must be a boolean");let d=n.at(1)??i.get("case_sensitive")??new I(!1);if(!(d instanceof I))throw new Error("case_sensitive must be a boolean");let p=n.at(2)??i.get("attribute")??new V;if(!(p instanceof x||p instanceof S||p instanceof V))throw new Error("attribute must be a string, integer, or null");let c=l=>{if(p instanceof V)return l;let u=p instanceof S?String(p.value):p.value;return ya(l,u)};return new P(e.value.slice().sort((l,u)=>{let y=c(l),E=c(u),N=mr(y,E,d.value);return s.value?-N:N}))}case"selectattr":case"rejectattr":{let n=a==="selectattr";if(e.value.some(l=>!Wo(l)))throw new Error(`\`${a}\` can only be applied to array of objects`);if(r.args.some(l=>l.type!=="StringLiteral"))throw new Error(`arguments of \`${a}\` must be strings`);let[i,s,d]=r.args.map(l=>this.evaluate(l,o)),p;if(s){let l=o.tests.get(s.value);if(!l)throw new Error(`Unknown test: ${s.value}`);p=l}else p=(...l)=>l[0].__bool__().value;let c=e.value.filter(l=>{let u=l.value.get(i.value),y=u?p(u,d):!1;return n?y:!y});return new P(c)}case"map":{let[,n]=this.evaluateArguments(r.args,o);if(n.has("attribute")){let i=n.get("attribute");if(!(i instanceof x))throw new Error("attribute must be a string");let s=n.get("default"),d=e.value.map(p=>{if(!Wo(p))throw new Error("items in map must be an object");let c=ya(p,i.value);return c instanceof q?s??new q:c});return new P(d)}else throw new Error("`map` expressions without `attribute` set are not currently supported.")}}throw new Error(`Unknown ArrayValue filter: ${a}`)}else if(e instanceof x){switch(a){case"indent":{let[n,i]=this.evaluateArguments(r.args,o),s=n.at(0)??i.get("width")??new S(4);if(!(s instanceof S))throw new Error("width must be a number");let d=n.at(1)??i.get("first")??new I(!1),p=n.at(2)??i.get("blank")??new I(!1),c=e.value.split(`
`),l=" ".repeat(s.value),u=c.map((y,E)=>!d.value&&E===0||!p.value&&y.length===0?y:l+y);return new x(u.join(`
`))}case"replace":{let n=e.builtins.get("replace");if(!(n instanceof B))throw new Error("replace filter not available");let[i,s]=this.evaluateArguments(r.args,o);return n.value([...i,new Ue(s)],o)}}throw new Error(`Unknown StringValue filter: ${a}`)}else if(e instanceof ee){let n=e.builtins.get(a);if(n&&n instanceof B){let[i,s]=this.evaluateArguments(r.args,o);return s.size>0&&i.push(new Ue(s)),n.value(i,o)}throw new Error(`Unknown ObjectValue filter: ${a}`)}else throw new Error(`Cannot apply filter "${a}" to type: ${e.type}`)}throw new Error(`Unknown filter: ${t.type}`)}evaluateFilterExpression(e,t){let o=this.evaluate(e.operand,t);return this.applyFilter(o,e.filter,t)}evaluateTestExpression(e,t){let o=this.evaluate(e.operand,t),r=t.tests.get(e.test.value);if(!r)throw new Error(`Unknown test: ${e.test.value}`);let a=r(o);return new I(e.negate?!a:a)}evaluateSelectExpression(e,t){return this.evaluate(e.test,t).__bool__().value?this.evaluate(e.lhs,t):new q}evaluateUnaryExpression(e,t){let o=this.evaluate(e.argument,t);switch(e.operator.value){case"not":return new I(!o.__bool__().value);case"+":case"-":{let r=e.operator.value==="-"?-1:1;if(o instanceof S||o instanceof D||o instanceof I){let a=o instanceof I?o.value?1:0:o.value,n=r*a;return o instanceof D?new D(n):new S(n)}throw new SyntaxError(`Unknown operator "${e.operator.value}" for ${o.type}`)}default:throw new SyntaxError(`Unknown operator: ${e.operator.value}`)}}evaluateTernaryExpression(e,t){return this.evaluate(e.condition,t).__bool__().value?this.evaluate(e.trueExpr,t):this.evaluate(e.falseExpr,t)}evalProgram(e,t){return this.evaluateBlock(e.body,t)}evaluateBlock(e,t){let o="";for(let r of e){let a=this.evaluate(r,t);a.type!=="NullValue"&&a.type!=="UndefinedValue"&&(o+=a.toString())}return new x(o)}evaluateIdentifier(e,t){return t.lookupVariable(e.value)}evaluateCallExpression(e,t){let[o,r]=this.evaluateArguments(e.args,t);r.size>0&&o.push(new Ue(r));let a=this.evaluate(e.callee,t);if(a.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${a.type}`);return a.value(o,t)}evaluateSliceExpression(e,t,o){if(!(e instanceof P||e instanceof x))throw new Error("Slice object must be an array or string");let r=this.evaluate(t.start,o),a=this.evaluate(t.stop,o),n=this.evaluate(t.step,o);if(!(r instanceof S||r instanceof q))throw new Error("Slice start must be numeric or undefined");if(!(a instanceof S||a instanceof q))throw new Error("Slice stop must be numeric or undefined");if(!(n instanceof S||n instanceof q))throw new Error("Slice step must be numeric or undefined");return e instanceof P?new P(ma(e.value,r.value,a.value,n.value)):new x(ma(Array.from(e.value),r.value,a.value,n.value).join(""))}evaluateMemberExpression(e,t){let o=this.evaluate(e.object,t),r;if(e.computed){if(e.property.type==="SliceExpression")return this.evaluateSliceExpression(o,e.property,t);r=this.evaluate(e.property,t)}else e.property.type==="IntegerLiteral"?r=new S(e.property.value):r=new x(e.property.value);let a;if(Wo(o)){if(!(r instanceof x))throw new Error(`Cannot access property with non-string: got ${r.type}`);a=o.value.get(r.value)??(o instanceof ee?o.builtins.get(r.value):void 0)}else if(o instanceof P||o instanceof x)if(r instanceof S)if(o instanceof x){let n=o.value.at(r.value);a=n===void 0?void 0:new x(n)}else a=o.value.at(r.value);else if(r instanceof x)a=o.builtins.get(r.value);else throw new Error(`Cannot access property with non-string/non-number: got ${r.type}`);else{if(!(r instanceof x))throw new Error(`Cannot access property with non-string: got ${r.type}`);a=o.builtins.get(r.value)}return a instanceof ue?a:new q}evaluateSet(e,t){let o=e.value?this.evaluate(e.value,t):this.evaluateBlock(e.body,t);if(e.assignee.type==="Identifier"){let r=e.assignee.value;t.setVariable(r,o)}else if(e.assignee.type==="TupleLiteral"){let r=e.assignee;if(!(o instanceof P))throw new Error(`Cannot unpack non-iterable type in set: ${o.type}`);let a=o.value;if(a.length!==r.value.length)throw new Error(`Too ${r.value.length>a.length?"few":"many"} items to unpack in set`);for(let n=0;n<r.value.length;++n){let i=r.value[n];if(i.type!=="Identifier")throw new Error(`Cannot unpack to non-identifier in set: ${i.type}`);t.setVariable(i.value,a[n])}}else if(e.assignee.type==="MemberExpression"){let r=e.assignee,a=this.evaluate(r.object,t);if(!(a instanceof fr))throw new Error("cannot assign attribute on non-namespace object");if(r.property.type!=="Identifier")throw new Error("Cannot assign to member with non-identifier property");a.value.set(r.property.value,o)}else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(e.assignee)}`);return new V}evaluateIf(e,t){let o=this.evaluate(e.test,t);return this.evaluateBlock(o.__bool__().value?e.body:e.alternate,t)}evaluateFor(e,t){let o=new xe(t),r,a;if(e.iterable.type==="SelectExpression"){let p=e.iterable;a=this.evaluate(p.lhs,o),r=p.test}else a=this.evaluate(e.iterable,o);if(!(a instanceof P||a instanceof ee))throw new Error(`Expected iterable or object type in for loop: got ${a.type}`);a instanceof ee&&(a=a.keys());let n=[],i=[];for(let p=0;p<a.value.length;++p){let c=new xe(o),l=a.value[p],u;if(e.loopvar.type==="Identifier")u=y=>y.setVariable(e.loopvar.value,l);else if(e.loopvar.type==="TupleLiteral"){let y=e.loopvar;if(l.type!=="ArrayValue")throw new Error(`Cannot unpack non-iterable type: ${l.type}`);let E=l;if(y.value.length!==E.value.length)throw new Error(`Too ${y.value.length>E.value.length?"few":"many"} items to unpack`);u=N=>{for(let F=0;F<y.value.length;++F){if(y.value[F].type!=="Identifier")throw new Error(`Cannot unpack non-identifier type: ${y.value[F].type}`);N.setVariable(y.value[F].value,E.value[F])}}}else throw new Error(`Invalid loop variable(s): ${e.loopvar.type}`);r&&(u(c),!this.evaluate(r,c).__bool__().value)||(n.push(l),i.push(u))}let s="",d=!0;for(let p=0;p<n.length;++p){let c=new Map([["index",new S(p+1)],["index0",new S(p)],["revindex",new S(n.length-p)],["revindex0",new S(n.length-p-1)],["first",new I(p===0)],["last",new I(p===n.length-1)],["length",new S(n.length)],["previtem",p>0?n[p-1]:new q],["nextitem",p<n.length-1?n[p+1]:new q]]);o.setVariable("loop",new ee(c)),i[p](o);try{let l=this.evaluateBlock(e.body,o);s+=l.value}catch(l){if(l instanceof fa)continue;if(l instanceof ua)break;throw l}d=!1}if(d){let p=this.evaluateBlock(e.defaultBlock,o);s+=p.value}return new x(s)}bindMacroArguments(e,t,o,r,a){let n=r.slice(),i=new Map;n.at(-1)instanceof Ue&&(i=new Map(n.pop().value));let s=[];for(let d=0;d<t.length;++d){let{name:p,defaultValue:c}=ur(t[d]),l=n[d];l===void 0&&i.has(p)&&(l=i.get(p),i.delete(p)),l===void 0&&c!==void 0&&s.push([p,c]),a.setVariable(p,l??new q)}if(o.has("kwargs"))a.setVariable("kwargs",new ee(i));else if(i.size>0)throw new Error(`macro ${e} takes no keyword argument '${i.keys().next().value}'`);if(o.has("varargs"))a.setVariable("varargs",new P(n.slice(t.length)));else if(n.length>t.length)throw new Error(`macro ${e} takes not more than ${t.length} argument(s)`);for(let[d,p]of s)a.setVariable(d,this.evaluate(p,a))}evaluateMacro(e,t){let o=wa(e.args,e.body);return t.setVariable(e.name.value,new B((r,a)=>{let n=new xe(a);return this.bindMacroArguments(`'${e.name.value}'`,e.args,o,r,n),this.evaluateBlock(e.body,n)})),new V}evaluateCallStatement(e,t){let o=e.callerArgs??[],r=wa(o,e.body),a=new B(p=>{let c=new xe(t);return this.bindMacroArguments("None",o,r,p,c),this.evaluateBlock(e.body,c)}),[n,i]=this.evaluateArguments(e.call.args,t);n.push(new Ue(i));let s=this.evaluate(e.call.callee,t);if(s.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${s.type}`);let d=new xe(t);return d.setVariable("caller",a),s.value(n,d)}evaluateFilterStatement(e,t){let o=this.evaluateBlock(e.body,t);return this.applyFilter(o,e.filter,t)}evaluate(e,t){if(!e)return new q;switch(e.type){case"Program":return this.evalProgram(e,t);case"Set":return this.evaluateSet(e,t);case"If":return this.evaluateIf(e,t);case"For":return this.evaluateFor(e,t);case"Macro":return this.evaluateMacro(e,t);case"CallStatement":return this.evaluateCallStatement(e,t);case"Break":throw new ua;case"Continue":throw new fa;case"IntegerLiteral":return new S(e.value);case"FloatLiteral":return new D(e.value);case"StringLiteral":return new x(e.value);case"ArrayLiteral":return new P(e.value.map(o=>this.evaluate(o,t)));case"TupleLiteral":return new ha(e.value.map(o=>this.evaluate(o,t)));case"ObjectLiteral":{let o=new Map;for(let[r,a]of e.value){let n=this.evaluate(r,t);if(!(n instanceof x))throw new Error(`Object keys must be strings: got ${n.type}`);o.set(n.value,this.evaluate(a,t))}return new ee(o)}case"Identifier":return this.evaluateIdentifier(e,t);case"CallExpression":return this.evaluateCallExpression(e,t);case"MemberExpression":return this.evaluateMemberExpression(e,t);case"UnaryExpression":return this.evaluateUnaryExpression(e,t);case"BinaryExpression":return this.evaluateBinaryExpression(e,t);case"FilterExpression":return this.evaluateFilterExpression(e,t);case"FilterStatement":return this.evaluateFilterStatement(e,t);case"TestExpression":return this.evaluateTestExpression(e,t);case"SelectExpression":return this.evaluateSelectExpression(e,t);case"Ternary":return this.evaluateTernaryExpression(e,t);case"Comment":return new V;default:throw new SyntaxError(`Unknown node type: ${e.type}`)}}};function Ko(e){switch(typeof e){case"number":return Number.isInteger(e)?new S(e):new D(e);case"string":return new x(e);case"boolean":return new I(e);case"undefined":return new q;case"object":return e===null?new V:Array.isArray(e)?new P(e.map(Ko)):new ee(new Map(Object.entries(e).map(([t,o])=>[t,Ko(o)])));case"function":return new B((t,o)=>{let r=e(...t.map(a=>a.value))??null;return Ko(r)});default:throw new Error(`Cannot convert to runtime value: ${e}`)}}var z=`
`,Ic="{%- ",Tc=" -%}",X=Object.freeze({CONDITIONAL:0,LOGICAL_OR:1,LOGICAL_AND:2,LOGICAL_NOT:3,COMPARISON:4,ADDITIVE:5,MULTIPLICATIVE:6,EXPONENTIATION:7,TEST:8,FILTER:9,UNARY_SIGN:10,ATOM:11});function va(e){switch(e.operator.type){case"ExponentiationBinaryOperator":return X.EXPONENTIATION;case"MultiplicativeBinaryOperator":return X.MULTIPLICATIVE;case"AdditiveBinaryOperator":return X.ADDITIVE;case"ComparisonBinaryOperator":return X.COMPARISON;case"Identifier":return e.operator.value==="and"?X.LOGICAL_AND:e.operator.value==="in"||e.operator.value==="not in"?X.COMPARISON:X.LOGICAL_OR}return X.LOGICAL_OR}function xa(e){switch(e.type){case"SelectExpression":case"Ternary":return X.CONDITIONAL;case"BinaryExpression":return va(e);case"UnaryExpression":return e.operator.value==="not"?X.LOGICAL_NOT:X.UNARY_SIGN;case"TestExpression":return X.TEST;case"FilterExpression":return X.FILTER;default:return X.ATOM}}function de(e,t){let o=H(e);return xa(e)<t?`(${o})`:o}function Sc(e,t="	"){let o=typeof t=="number"?" ".repeat(t):t;return me(e.body,0,o).replace(/\n$/,"")}function J(...e){return Ic+e.join(" ")+Tc}function me(e,t,o){return e.map(r=>Rc(r,t,o)).join(z)}function Go(e){return e.map(t=>H(t)).join(", ")}function Rc(e,t,o){let r=o.repeat(t);switch(e.type){case"Program":return me(e.body,t,o);case"If":return Ec(e,t,o);case"For":return Pc(e,t,o);case"Set":return Cc(e,t,o);case"Macro":return Lc(e,t,o);case"Break":return r+J("break");case"Continue":return r+J("continue");case"CallStatement":return Uc(e,t,o);case"FilterStatement":return Mc(e,t,o);case"Comment":return r+"{# "+e.value+" #}";default:return r+"{{- "+H(e)+" -}}"}}function Ec(e,t,o){let r=o.repeat(t),a=[],n=e;for(;n&&(a.push({test:n.test,body:n.body}),n.alternate.length===1&&n.alternate[0].type==="If");)n=n.alternate[0];let i=r+J("if",H(a[0].test))+z+me(a[0].body,t+1,o);for(let s=1;s<a.length;++s)i+=z+r+J("elif",H(a[s].test))+z+me(a[s].body,t+1,o);return n&&n.alternate.length>0&&(i+=z+r+J("else")+z+me(n.alternate,t+1,o)),i+=z+r+J("endif"),i}function Pc(e,t,o){let r=o.repeat(t),a="";if(e.iterable.type==="SelectExpression"){let i=e.iterable;a=`${H(i.lhs)} if ${H(i.test)}`}else a=H(e.iterable);let n=r+J("for",H(e.loopvar),"in",a)+z+me(e.body,t+1,o);return e.defaultBlock.length>0&&(n+=z+r+J("else")+z+me(e.defaultBlock,t+1,o)),n+=z+r+J("endfor"),n}function Cc(e,t,o){let r=o.repeat(t),a=H(e.assignee),n=e.value?H(e.value):"",i=r+J("set",`${a}${e.value?" = "+n:""}`);return e.body.length===0?i:i+z+me(e.body,t+1,o)+z+r+J("endset")}function Lc(e,t,o){let r=o.repeat(t),a=Go(e.args);return r+J("macro",`${e.name.value}(${a})`)+z+me(e.body,t+1,o)+z+r+J("endmacro")}function Uc(e,t,o){let r=o.repeat(t),a=e.callerArgs&&e.callerArgs.length>0?`(${Go(e.callerArgs)})`:"",n=H(e.call),i=r+J(`call${a}`,n)+z;return i+=me(e.body,t+1,o)+z,i+=r+J("endcall"),i}function Mc(e,t,o){let r=o.repeat(t),a=e.filter.type==="Identifier"?e.filter.value:H(e.filter),n=r+J("filter",a)+z;return n+=me(e.body,t+1,o)+z,n+=r+J("endfilter"),n}function H(e){switch(e.type){case"SpreadExpression":return`*${H(e.argument)}`;case"KeywordSpreadExpression":return`**${H(e.argument)}`;case"Identifier":return e.value;case"IntegerLiteral":return`${e.value}`;case"FloatLiteral":{let t=e.value;return Object.is(t,-0)?"-0.0":t%1===0?t.toFixed(1):t.toString()}case"StringLiteral":return JSON.stringify(e.value);case"BinaryExpression":{let t=e,o=va(t),r=de(t.left,o),a=de(t.right,o+1);return`${r} ${t.operator.value} ${a}`}case"UnaryExpression":{let t=e,o=t.argument.type==="UnaryExpression"?xa(t):X.ATOM;return t.operator.value+(t.operator.value==="not"?" ":"")+de(t.argument,o)}case"CallExpression":{let t=e,o=Go(t.args);return`${H(t.callee)}(${o})`}case"MemberExpression":{let t=e,o=de(t.object,X.ATOM),r=H(t.property);return!t.computed&&t.property.type!=="Identifier"&&t.property.type!=="IntegerLiteral"&&(r=`(${r})`),t.computed?`${o}[${r}]`:`${o}.${r}`}case"FilterExpression":{let t=e,o=de(t.operand,X.FILTER);return t.filter.type==="CallExpression"?`${o} | ${H(t.filter)}`:`${o} | ${t.filter.value}`}case"SelectExpression":{let t=e;return`${de(t.lhs,X.LOGICAL_OR)} if ${de(t.test,X.LOGICAL_OR)}`}case"TestExpression":{let t=e;return`${de(t.operand,X.TEST)} is${t.negate?" not":""} ${t.test.value}`}case"ArrayLiteral":case"TupleLiteral":{let t=Go(e.value),o=e.type==="ArrayLiteral"?"[]":"()";return`${o[0]}${t}${o[1]}`}case"ObjectLiteral":return`{${Array.from(e.value.entries()).map(([o,r])=>`${H(o)}: ${H(r)}`).join(", ")}}`;case"SliceExpression":{let t=e,o=t.start?H(t.start):"",r=t.stop?H(t.stop):"",a=t.step?`:${H(t.step)}`:"";return`${o}:${r}${a}`}case"KeywordArgumentExpression":{let t=e;return`${t.key.value}=${H(t.value)}`}case"Ternary":{let t=e;return`${de(t.trueExpr,X.LOGICAL_OR)} if ${de(t.condition,X.LOGICAL_OR)} else ${de(t.falseExpr,X.CONDITIONAL)}`}default:throw new Error(`Unknown expression type: ${e.type}`)}}var Aa=class{parsed;constructor(e){let t=Hp(e,{lstrip_blocks:!0,trim_blocks:!0});this.parsed=uc(t)}render(e){let t=new xe;if(Ac(t),e)for(let[a,n]of Object.entries(e))t.set(a,n);return new kc(t).run(this.parsed).value}format(e){return Sc(this.parsed,e?.indent||"	")}};var gr={"adapter-transformers":["question-answering","text-classification","token-classification"],allennlp:["question-answering"],asteroid:["audio-to-audio"],bertopic:["text-classification"],diffusers:["image-to-image","text-to-image"],doctr:["object-detection"],espnet:["text-to-speech","automatic-speech-recognition"],fairseq:["text-to-speech","audio-to-audio"],fastai:["image-classification"],fasttext:["feature-extraction","text-classification"],flair:["token-classification"],k2:["automatic-speech-recognition"],keras:["image-classification"],nemo:["automatic-speech-recognition"],open_clip:["zero-shot-classification","zero-shot-image-classification"],paddlenlp:["fill-mask","summarization","zero-shot-classification"],peft:["text-generation"],"pyannote-audio":["automatic-speech-recognition"],"sentence-transformers":["feature-extraction","sentence-similarity"],setfit:["text-classification"],sklearn:["tabular-classification","tabular-regression","text-classification"],spacy:["token-classification","text-classification","sentence-similarity"],"span-marker":["token-classification"],speechbrain:["audio-classification","audio-to-audio","automatic-speech-recognition","text-to-speech"],stanza:["token-classification"],timm:["image-classification","image-feature-extraction"],transformers:["audio-classification","automatic-speech-recognition","depth-estimation","document-question-answering","feature-extraction","fill-mask","image-classification","image-feature-extraction","image-segmentation","image-to-image","image-to-text","image-text-to-text","mask-generation","object-detection","question-answering","summarization","table-question-answering","text-classification","text-generation","text-to-audio","text-to-speech","token-classification","translation","video-classification","visual-question-answering","zero-shot-classification","zero-shot-image-classification","zero-shot-object-detection"],mindspore:["image-classification"]},ka=["image-to-image","image-to-text","question-answering","summarization","translation","visual-question-answering"];var L_=new Map([["text-classification",["\u067E\u0631\u0648\u0698\u0647 \u0628\u0647 \u0645\u0648\u0642\u0639 \u062A\u062D\u0648\u06CC\u0644 \u0634\u062F \u0648 \u0647\u0645\u0647 \u0686\u06CC\u0632 \u062E\u0648\u0628 \u0628\u0648\u062F.","\u0633\u06CC\u0628\u200C\u0632\u0645\u06CC\u0646\u06CC \u0628\u06CC\u200C\u06A9\u06CC\u0641\u06CC\u062A \u0628\u0648\u062F.","\u0642\u06CC\u0645\u062A \u0648 \u06A9\u06CC\u0641\u06CC\u062A \u0639\u0627\u0644\u06CC","\u062E\u0648\u0628 \u0646\u0628\u0648\u062F \u0627\u0635\u0644\u0627"]],["token-classification",["\u0627\u06CC\u0646 \u0633\u0631\u06CC\u0627\u0644 \u0628\u0647 \u0635\u0648\u0631\u062A \u0631\u0633\u0645\u06CC \u062F\u0631 \u062A\u0627\u0631\u06CC\u062E \u062F\u0647\u0645 \u0645\u06CC \u06F2\u06F0\u06F1\u06F1 \u062A\u0648\u0633\u0637 \u0634\u0628\u06A9\u0647 \u0641\u0627\u06A9\u0633 \u0628\u0631\u0627\u06CC \u067E\u062E\u0634 \u0631\u0632\u0631\u0648 \u0634\u062F.","\u062F\u0641\u062A\u0631 \u0645\u0631\u06A9\u0632\u06CC \u0634\u0631\u06A9\u062A \u067E\u0627\u0631\u0633\u200C\u0645\u06CC\u0646\u0648 \u062F\u0631 \u0634\u0647\u0631 \u0627\u0631\u0627\u06A9 \u062F\u0631 \u0627\u0633\u062A\u0627\u0646 \u0645\u0631\u06A9\u0632\u06CC \u0642\u0631\u0627\u0631 \u062F\u0627\u0631\u062F.","\u0648\u06CC \u062F\u0631 \u0633\u0627\u0644 \u06F2\u06F0\u06F1\u06F3 \u062F\u0631\u06AF\u0630\u0634\u062A \u0648 \u0645\u0633\u0626\u0648\u0644 \u062E\u0627\u06A9\u0633\u067E\u0627\u0631\u06CC \u0648 \u0627\u0642\u0648\u0627\u0645\u0634 \u0628\u0631\u0627\u06CC \u0627\u0648 \u0645\u0631\u0627\u0633\u0645 \u06CC\u0627\u062F\u0628\u0648\u062F \u06AF\u0631\u0641\u062A\u0646\u062F."]],["question-answering",[{text:"\u0645\u0646 \u06A9\u062C\u0627 \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u06A9\u0646\u0645\u061F",context:"\u0646\u0627\u0645 \u0645\u0646 \u067E\u0698\u0645\u0627\u0646 \u0627\u0633\u062A \u0648 \u062F\u0631 \u06AF\u0631\u06AF\u0627\u0646 \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u06A9\u0646\u0645."},{text:"\u0646\u0627\u0645\u0645 \u0686\u06CC\u0633\u062A \u0648 \u06A9\u062C\u0627 \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u200C\u06A9\u0646\u0645\u061F",context:"\u0627\u0633\u0645\u0645 \u0633\u0627\u0631\u0627 \u0627\u0633\u062A \u0648 \u062F\u0631 \u0622\u0641\u0631\u06CC\u0642\u0627\u06CC \u062C\u0646\u0648\u0628\u06CC \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u06A9\u0646\u0645."},{text:"\u0646\u0627\u0645 \u0645\u0646 \u0686\u06CC\u0633\u062A\u061F",context:"\u0645\u0646 \u0645\u0631\u06CC\u0645 \u0647\u0633\u062A\u0645 \u0648 \u062F\u0631 \u062A\u0628\u0631\u06CC\u0632 \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u200C\u06A9\u0646\u0645."},{text:"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0645\u0633\u0627\u062D\u062A \u062C\u0646\u06AF\u0644 \u0622\u0645\u0627\u0632\u0648\u0646 \u062F\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0634\u0648\u0631 \u0627\u0633\u062A\u061F",context:["\u0622\u0645\u0627\u0632\u0648\u0646 \u0646\u0627\u0645 \u0628\u0632\u0631\u06AF\u200C\u062A\u0631\u06CC\u0646 \u062C\u0646\u06AF\u0644 \u0628\u0627\u0631\u0627\u0646\u06CC \u062C\u0647\u0627\u0646 \u0627\u0633\u062A \u06A9\u0647 \u062F\u0631 \u0634\u0645\u0627\u0644 \u0622\u0645\u0631\u06CC\u06A9\u0627\u06CC \u062C\u0646\u0648\u0628\u06CC \u0642\u0631\u0627\u0631 \u06AF\u0631\u0641\u062A\u0647 \u0648 \u0628\u06CC\u0634\u062A\u0631 \u0622\u0646 \u062F\u0631 \u062E\u0627\u06A9 \u0628\u0631\u0632\u06CC\u0644 \u0648 \u067E\u0631\u0648","\u062C\u0627\u06CC \u062F\u0627\u0631\u062F. \u0628\u06CC\u0634 \u0627\u0632 \u0646\u06CC\u0645\u06CC \u0627\u0632 \u0647\u0645\u0647 \u062C\u0646\u06AF\u0644\u200C\u0647\u0627\u06CC \u0628\u0627\u0631\u0627\u0646\u06CC \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647 \u062F\u0631 \u062C\u0647\u0627\u0646 \u062F\u0631 \u0622\u0645\u0627\u0632\u0648\u0646 \u0642\u0631\u0627\u0631 \u062F\u0627\u0631\u062F.","\u0645\u0633\u0627\u062D\u062A \u062C\u0646\u06AF\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u0632\u0648\u0646 \u06F5\u066B\u06F5 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u06A9\u06CC\u0644\u0648\u0645\u062A\u0631 \u0645\u0631\u0628\u0639 \u0627\u0633\u062A \u06A9\u0647 \u0628\u06CC\u0646 \u06F9 \u06A9\u0634\u0648\u0631 \u062A\u0642\u0633\u06CC\u0645 \u0634\u062F\u0647\u200C\u0627\u0633\u062A."].join(`
`)}]],["translation",["\u0628\u06CC\u0634\u062A\u0631 \u0645\u0633\u0627\u062D\u062A \u062C\u0646\u06AF\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u0632\u0648\u0646 \u062F\u0631 \u062D\u0648\u0636\u0647 \u0622\u0628\u0631\u06CC\u0632 \u0631\u0648\u062F \u0622\u0645\u0627\u0632\u0648\u0646 \u0648 \u06F1\u06F1\u06F0\u06F0 \u0634\u0627\u062E\u0647 \u0622\u0646 \u0648\u0627\u0642\u0639 \u0634\u062F\u0647\u200C\u0627\u0633\u062A.","\u0645\u0631\u062F\u0645\u0627\u0646 \u0646\u064E\u0628\u064E\u0637\u06CC \u0627\u0632 \u0647\u0632\u0627\u0631\u0647\u200C\u0647\u0627\u06CC \u06CC\u06A9\u0645 \u0648 \u062F\u0648\u0645 \u067E\u06CC\u0634 \u0627\u0632 \u0645\u06CC\u0644\u0627\u062F \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0646\u0637\u0642\u0647 \u0632\u0646\u062F\u06AF\u06CC \u0645\u06CC\u200C\u06A9\u0631\u062F\u0646\u062F."]],["summarization",[["\u0634\u0627\u0647\u0646\u0627\u0645\u0647 \u0627\u062B\u0631 \u062D\u06A9\u06CC\u0645 \u0627\u0628\u0648\u0627\u0644\u0642\u0627\u0633\u0645 \u0641\u0631\u062F\u0648\u0633\u06CC \u062A\u0648\u0633\u06CC\u060C \u062D\u0645\u0627\u0633\u0647\u200C\u0627\u06CC \u0645\u0646\u0638\u0648\u0645\u060C \u0628\u0631 \u062D\u0633\u0628 \u062F\u0633\u062A \u0646\u0648\u0634\u062A\u0647\u200C\u0647\u0627\u06CC ","\u0645\u0648\u062C\u0648\u062F \u062F\u0631\u0628\u0631\u06AF\u06CC\u0631\u0646\u062F\u0647 \u0646\u0632\u062F\u06CC\u06A9 \u0628\u0647 \u06F5\u06F0\u066C\u06F0\u06F0\u06F0 \u0628\u06CC\u062A \u062A\u0627 \u0646\u0632\u062F\u06CC\u06A9 \u0628\u0647 \u06F6\u06F1\u066C\u06F0\u06F0\u06F0 \u0628\u06CC\u062A \u0648 \u06CC\u06A9\u06CC \u0627\u0632 ","\u0628\u0632\u0631\u06AF\u200C\u062A\u0631\u06CC\u0646 \u0648 \u0628\u0631\u062C\u0633\u062A\u0647\u200C\u062A\u0631\u06CC\u0646 \u0633\u0631\u0648\u062F\u0647\u200C\u0647\u0627\u06CC \u062D\u0645\u0627\u0633\u06CC \u062C\u0647\u0627\u0646 \u0627\u0633\u062A \u06A9\u0647 \u0633\u0631\u0627\u06CC\u0634 \u0622\u0646 \u062F\u0633\u062A\u200C\u0622\u0648\u0631\u062F\u0650 ","\u062F\u0633\u062A\u200C\u06A9\u0645 \u0633\u06CC \u0633\u0627\u0644 \u06A9\u0627\u0631\u0650 \u067E\u06CC\u0648\u0633\u062A\u0647\u0654 \u0627\u06CC\u0646 \u0633\u062E\u0646\u200C\u0633\u0631\u0627\u06CC \u0646\u0627\u0645\u062F\u0627\u0631 \u0627\u06CC\u0631\u0627\u0646\u06CC \u0627\u0633\u062A. \u0645\u0648\u0636\u0648\u0639 \u0627\u06CC\u0646 \u0634\u0627\u0647\u06A9\u0627\u0631 \u0627\u062F\u0628\u06CC\u060C"," \u0627\u0641\u0633\u0627\u0646\u0647\u200C\u0647\u0627 \u0648 \u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0631\u0627\u0646 \u0627\u0632 \u0622\u063A\u0627\u0632 \u062A\u0627 \u062D\u0645\u0644\u0647\u0654 \u0639\u0631\u0628\u200C\u0647\u0627 \u0628\u0647 \u0627\u06CC\u0631\u0627\u0646 \u062F\u0631 \u0633\u062F\u0647\u0654 \u0647\u0641\u062A\u0645 \u0645\u06CC\u0644\u0627\u062F\u06CC \u0627\u0633\u062A","  (\u0634\u0627\u0647\u0646\u0627\u0645\u0647 \u0627\u0632 \u0633\u0647 \u0628\u062E\u0634 \u0627\u0633\u0637\u0648\u0631\u0647\u060C \u067E\u0647\u0644\u0648\u0627\u0646\u06CC \u0648 \u062A\u0627\u0631\u06CC\u062E\u06CC \u062A\u0634\u06A9\u06CC\u0644 \u0634\u062F\u0647\u200C\u0627\u0633\u062A) \u06A9\u0647 \u062F\u0631 \u0686\u0647\u0627\u0631","   \u062F\u0648\u062F\u0645\u0627\u0646 \u067E\u0627\u062F\u0634\u0627\u0647\u06CC\u0650 \u067E\u06CC\u0634\u062F\u0627\u062F\u06CC\u0627\u0646\u060C \u06A9\u06CC\u0627\u0646\u06CC\u0627\u0646\u060C \u0627\u0634\u06A9\u0627\u0646\u06CC\u0627\u0646 \u0648 \u0633\u0627\u0633\u0627\u0646\u06CC\u0627\u0646 \u06AF\u0646\u062C\u0627\u0646\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","    \u0634\u0627\u0647\u0646\u0627\u0645\u0647 \u0628\u0631 \u0648\u0632\u0646 \xAB\u0641\u064E\u0639\u0648\u0644\u064F\u0646 \u0641\u0639\u0648\u0644\u0646 \u0641\u0639\u0648\u0644\u0646 \u0641\u064E\u0639\u064E\u0644\u0652\xBB\u060C \u062F\u0631 \u0628\u062D\u0631\u0650 \u0645\u064F\u062A\u064E\u0642\u0627\u0631\u0650\u0628\u0650 \u0645\u062B\u0645\u064E\u0651\u0646\u0650 \u0645\u062D\u0630\u0648\u0641 \u0646\u06AF\u0627\u0634\u062A\u0647 \u0634\u062F\u0647\u200C\u0627\u0633\u062A.","\u0647\u0646\u06AF\u0627\u0645\u06CC \u06A9\u0647 \u0632\u0628\u0627\u0646 \u062F\u0627\u0646\u0634 \u0648 \u0627\u062F\u0628\u06CC\u0627\u062A \u062F\u0631 \u0627\u06CC\u0631\u0627\u0646 \u0632\u0628\u0627\u0646 \u0639\u0631\u0628\u06CC \u0628\u0648\u062F\u060C \u0641\u0631\u062F\u0648\u0633\u06CC\u060C \u0628\u0627 \u0633\u0631\u0648\u062F\u0646 \u0634\u0627\u0647\u0646\u0627\u0645\u0647"," \u0628\u0627 \u0648\u06CC\u0698\u06AF\u06CC\u200C\u0647\u0627\u06CC \u0647\u062F\u0641\u200C\u0645\u0646\u062F\u06CC \u06A9\u0647 \u062F\u0627\u0634\u062A\u060C \u0632\u0628\u0627\u0646 \u067E\u0627\u0631\u0633\u06CC \u0631\u0627 \u0632\u0646\u062F\u0647 \u0648 \u067E\u0627\u06CC\u062F\u0627\u0631 \u06A9\u0631\u062F. \u06CC\u06A9\u06CC \u0627\u0632 "," \u0628\u0646\u200C\u0645\u0627\u06CC\u0647\u200C\u0647\u0627\u06CC \u0645\u0647\u0645\u06CC \u06A9\u0647 \u0641\u0631\u062F\u0648\u0633\u06CC \u0628\u0631\u0627\u06CC \u0633\u0631\u0648\u062F\u0646 \u0634\u0627\u0647\u0646\u0627\u0645\u0647 \u0627\u0632 \u0622\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u060C","  \u0634\u0627\u0647\u0646\u0627\u0645\u0647\u0654 \u0627\u0628\u0648\u0645\u0646\u0635\u0648\u0631\u06CC \u0628\u0648\u062F. \u0634\u0627\u0647\u0646\u0627\u0645\u0647 \u0646\u0641\u0648\u0630 \u0628\u0633\u06CC\u0627\u0631\u06CC \u062F\u0631 \u062C\u0647\u062A\u200C\u06AF\u06CC\u0631\u06CC ","  \u0641\u0631\u0647\u0646\u06AF \u0641\u0627\u0631\u0633\u06CC \u0648 \u0646\u06CC\u0632 \u0628\u0627\u0632\u062A\u0627\u0628\u200C\u0647\u0627\u06CC \u0634\u06A9\u0648\u0647\u200C\u0645\u0646\u062F\u06CC \u062F\u0631 \u0627\u062F\u0628\u06CC\u0627\u062A \u062C\u0647\u0627\u0646 \u062F\u0627\u0634\u062A\u0647\u200C\u0627\u0633\u062A \u0648 \u0634\u0627\u0639\u0631\u0627\u0646 ","  \u0628\u0632\u0631\u06AF\u06CC \u0645\u0627\u0646\u0646\u062F \u06AF\u0648\u062A\u0647 \u0648 \u0648\u06CC\u06A9\u062A\u0648\u0631 \u0647\u0648\u06AF\u0648 \u0627\u0632 \u0622\u0646 \u0628\u0647 \u0646\u06CC\u06A9\u06CC \u06CC\u0627\u062F \u06A9\u0631\u062F\u0647\u200C\u0627\u0646\u062F."].join(`
`)]],["text-generation",["\u0627\u0633\u0645 \u0645\u0646 \u0646\u0627\u0632\u0646\u06CC\u0646 \u0627\u0633\u062A \u0648 \u0645\u0646","\u0631\u0648\u0632\u06CC \u0631\u0648\u0632\u06AF\u0627\u0631\u06CC"]],["fill-mask",["\u0632\u0646\u062F\u06AF\u06CC \u06CC\u06A9 \u0633\u0648\u0627\u0644 \u0627\u0633\u062A \u0648 \u0627\u06CC\u0646 \u06A9\u0647 \u0686\u06AF\u0648\u0646\u0647 <mask> \u06A9\u0646\u06CC\u0645 \u067E\u0627\u0633\u062E \u0627\u06CC\u0646 \u0633\u0648\u0627\u0644!","\u0632\u0646\u062F\u06AF\u06CC \u0627\u0632 \u0645\u0631\u06AF \u067E\u0631\u0633\u06CC\u062F: \u0686\u0631\u0627 \u0647\u0645\u0647 \u0645\u0646 \u0631\u0627 <mask> \u062F\u0627\u0631\u0646\u062F \u0627\u0645\u0627 \u0627\u0632 \u062A\u0648 \u0645\u062A\u0646\u0641\u0631\u0646\u062F\u061F"]]]);var rt={"text-classification":{name:"Text Classification",subtasks:[{type:"acceptability-classification",name:"Acceptability Classification"},{type:"entity-linking-classification",name:"Entity Linking Classification"},{type:"fact-checking",name:"Fact Checking"},{type:"intent-classification",name:"Intent Classification"},{type:"language-identification",name:"Language Identification"},{type:"multi-class-classification",name:"Multi Class Classification"},{type:"multi-label-classification",name:"Multi Label Classification"},{type:"multi-input-text-classification",name:"Multi-input Text Classification"},{type:"natural-language-inference",name:"Natural Language Inference"},{type:"semantic-similarity-classification",name:"Semantic Similarity Classification"},{type:"sentiment-classification",name:"Sentiment Classification"},{type:"topic-classification",name:"Topic Classification"},{type:"semantic-similarity-scoring",name:"Semantic Similarity Scoring"},{type:"sentiment-scoring",name:"Sentiment Scoring"},{type:"sentiment-analysis",name:"Sentiment Analysis"},{type:"hate-speech-detection",name:"Hate Speech Detection"},{type:"text-scoring",name:"Text Scoring"}],modality:"nlp"},"token-classification":{name:"Token Classification",subtasks:[{type:"named-entity-recognition",name:"Named Entity Recognition"},{type:"part-of-speech",name:"Part of Speech"},{type:"parsing",name:"Parsing"},{type:"lemmatization",name:"Lemmatization"},{type:"word-sense-disambiguation",name:"Word Sense Disambiguation"},{type:"coreference-resolution",name:"Coreference-resolution"}],modality:"nlp"},"table-question-answering":{name:"Table Question Answering",modality:"nlp"},"question-answering":{name:"Question Answering",subtasks:[{type:"extractive-qa",name:"Extractive QA"},{type:"open-domain-qa",name:"Open Domain QA"},{type:"closed-domain-qa",name:"Closed Domain QA"}],modality:"nlp"},"zero-shot-classification":{name:"Zero-Shot Classification",modality:"nlp"},translation:{name:"Translation",modality:"nlp"},summarization:{name:"Summarization",subtasks:[{type:"news-articles-summarization",name:"News Articles Summarization"},{type:"news-articles-headline-generation",name:"News Articles Headline Generation"}],modality:"nlp"},"feature-extraction":{name:"Feature Extraction",modality:"nlp"},"text-generation":{name:"Text Generation",subtasks:[{type:"dialogue-modeling",name:"Dialogue Modeling"},{type:"dialogue-generation",name:"Dialogue Generation"},{type:"conversational",name:"Conversational"},{type:"language-modeling",name:"Language Modeling"},{type:"text-simplification",name:"Text simplification"},{type:"explanation-generation",name:"Explanation Generation"},{type:"abstractive-qa",name:"Abstractive QA"},{type:"open-domain-abstractive-qa",name:"Open Domain Abstractive QA"},{type:"closed-domain-qa",name:"Closed Domain QA"},{type:"open-book-qa",name:"Open Book QA"},{type:"closed-book-qa",name:"Closed Book QA"},{type:"text2text-generation",name:"Text2Text Generation"}],modality:"nlp"},"fill-mask":{name:"Fill-Mask",subtasks:[{type:"slot-filling",name:"Slot Filling"},{type:"masked-language-modeling",name:"Masked Language Modeling"}],modality:"nlp"},"sentence-similarity":{name:"Sentence Similarity",modality:"nlp"},"text-to-speech":{name:"Text-to-Speech",modality:"audio"},"text-to-audio":{name:"Text-to-Audio",modality:"audio"},"automatic-speech-recognition":{name:"Automatic Speech Recognition",modality:"audio"},"audio-to-audio":{name:"Audio-to-Audio",modality:"audio"},"audio-classification":{name:"Audio Classification",subtasks:[{type:"keyword-spotting",name:"Keyword Spotting"},{type:"speaker-identification",name:"Speaker Identification"},{type:"audio-intent-classification",name:"Audio Intent Classification"},{type:"audio-emotion-recognition",name:"Audio Emotion Recognition"},{type:"audio-language-identification",name:"Audio Language Identification"}],modality:"audio"},"audio-text-to-text":{name:"Audio-Text-to-Text",modality:"multimodal",hideInDatasets:!0},"voice-activity-detection":{name:"Voice Activity Detection",modality:"audio"},"depth-estimation":{name:"Depth Estimation",modality:"cv"},"image-classification":{name:"Image Classification",subtasks:[{type:"multi-label-image-classification",name:"Multi Label Image Classification"},{type:"multi-class-image-classification",name:"Multi Class Image Classification"}],modality:"cv"},"object-detection":{name:"Object Detection",subtasks:[{type:"face-detection",name:"Face Detection"},{type:"vehicle-detection",name:"Vehicle Detection"}],modality:"cv"},"image-segmentation":{name:"Image Segmentation",subtasks:[{type:"instance-segmentation",name:"Instance Segmentation"},{type:"semantic-segmentation",name:"Semantic Segmentation"},{type:"panoptic-segmentation",name:"Panoptic Segmentation"}],modality:"cv"},"text-to-image":{name:"Text-to-Image",modality:"cv"},"image-to-text":{name:"Image-to-Text",subtasks:[{type:"image-captioning",name:"Image Captioning"}],modality:"cv"},"image-to-image":{name:"Image-to-Image",subtasks:[{type:"image-inpainting",name:"Image Inpainting"},{type:"image-colorization",name:"Image Colorization"},{type:"super-resolution",name:"Super Resolution"}],modality:"cv"},"image-to-video":{name:"Image-to-Video",modality:"cv"},"unconditional-image-generation":{name:"Unconditional Image Generation",modality:"cv"},"video-classification":{name:"Video Classification",modality:"cv"},"reinforcement-learning":{name:"Reinforcement Learning",modality:"rl"},robotics:{name:"Robotics",modality:"rl",subtasks:[{type:"grasping",name:"Grasping"},{type:"task-planning",name:"Task Planning"}]},"tabular-classification":{name:"Tabular Classification",modality:"tabular",subtasks:[{type:"tabular-multi-class-classification",name:"Tabular Multi Class Classification"},{type:"tabular-multi-label-classification",name:"Tabular Multi Label Classification"}]},"tabular-regression":{name:"Tabular Regression",modality:"tabular",subtasks:[{type:"tabular-single-column-regression",name:"Tabular Single Column Regression"}]},"tabular-to-text":{name:"Tabular to Text",modality:"tabular",subtasks:[{type:"rdf-to-text",name:"RDF to text"}],hideInModels:!0},"table-to-text":{name:"Table to Text",modality:"nlp",hideInModels:!0},"multiple-choice":{name:"Multiple Choice",subtasks:[{type:"multiple-choice-qa",name:"Multiple Choice QA"},{type:"multiple-choice-coreference-resolution",name:"Multiple Choice Coreference Resolution"}],modality:"nlp",hideInModels:!0},"text-ranking":{name:"Text Ranking",modality:"nlp"},"text-retrieval":{name:"Text Retrieval",subtasks:[{type:"document-retrieval",name:"Document Retrieval"},{type:"utterance-retrieval",name:"Utterance Retrieval"},{type:"entity-linking-retrieval",name:"Entity Linking Retrieval"},{type:"fact-checking-retrieval",name:"Fact Checking Retrieval"}],modality:"nlp",hideInModels:!0},"time-series-forecasting":{name:"Time Series Forecasting",modality:"tabular",subtasks:[{type:"univariate-time-series-forecasting",name:"Univariate Time Series Forecasting"},{type:"multivariate-time-series-forecasting",name:"Multivariate Time Series Forecasting"}]},"text-to-video":{name:"Text-to-Video",modality:"cv"},"image-text-to-text":{name:"Image-Text-to-Text",modality:"multimodal"},"image-text-to-image":{name:"Image-Text-to-Image",modality:"multimodal"},"image-text-to-video":{name:"Image-Text-to-Video",modality:"multimodal"},"visual-question-answering":{name:"Visual Question Answering",subtasks:[{type:"visual-question-answering",name:"Visual Question Answering"}],modality:"multimodal"},"document-question-answering":{name:"Document Question Answering",subtasks:[{type:"document-question-answering",name:"Document Question Answering"}],modality:"multimodal",hideInDatasets:!0},"zero-shot-image-classification":{name:"Zero-Shot Image Classification",modality:"cv"},"graph-ml":{name:"Graph Machine Learning",modality:"other"},"mask-generation":{name:"Mask Generation",modality:"cv"},"zero-shot-object-detection":{name:"Zero-Shot Object Detection",modality:"cv"},"text-to-3d":{name:"Text-to-3D",modality:"cv"},"image-to-3d":{name:"Image-to-3D",modality:"cv"},"image-feature-extraction":{name:"Image Feature Extraction",modality:"cv"},"video-text-to-text":{name:"Video-Text-to-Text",modality:"multimodal",hideInDatasets:!1},"keypoint-detection":{name:"Keypoint Detection",subtasks:[{type:"pose-estimation",name:"Pose Estimation"}],modality:"cv",hideInDatasets:!0},"visual-document-retrieval":{name:"Visual Document Retrieval",modality:"multimodal"},"any-to-any":{name:"Any-to-Any",modality:"multimodal"},"video-to-video":{name:"Video-to-Video",modality:"cv",hideInDatasets:!0},other:{name:"Other",modality:"other",hideInModels:!0,hideInDatasets:!0}},Ia=Object.keys(rt),Oc=Object.values(rt).flatMap(e=>"subtasks"in e?e.subtasks:[]).map(e=>e.type),Dc=new Set(Ia);var Nc={datasets:[{description:"A dataset with multiple modality input and output pairs.",id:"PKU-Alignment/align-anything"}],demo:{inputs:[{filename:"any-to-any-input.jpg",type:"img"},{label:"Text Prompt",content:"What is the significance of this place?",type:"text"}],outputs:[{label:"Generated Text",content:"The place in the picture is Osaka Castle, located in Osaka, Japan. Osaka Castle is a historic castle that was originally built in the 16th century by Toyotomi Hideyoshi, a powerful warlord of the time. It is one of the most famous landmarks in Osaka and is known for its distinctive white walls and black roof tiles. The castle has been rebuilt several times over the centuries and is now a popular tourist attraction, offering visitors a glimpse into Japan's rich history and culture.",type:"text"},{filename:"any-to-any-output.wav",type:"audio"}]},metrics:[],models:[{description:"Strong model that can take in video, audio, image, text and output text and natural speech.",id:"Qwen/Qwen2.5-Omni-7B"},{description:"Robust model that can take in image and text and generate image and text.",id:"OmniGen2/OmniGen2"},{description:"Any-to-any model with speech, video, audio, image and text understanding capabilities.",id:"openbmb/MiniCPM-o-2_6"},{description:"A model that can understand image and text and generate image and text.",id:"ByteDance-Seed/BAGEL-7B-MoT"}],spaces:[{description:"An application to chat with an any-to-any (image & text) model.",id:"OmniGen2/OmniGen2"}],summary:"Any-to-any models can understand two or more modalities and output two or more modalities.",widgetModels:[],youtubeId:""},Ta=Nc;var $c={datasets:[{description:"A benchmark of 10 different audio tasks.",id:"s3prl/superb"},{description:"A dataset of YouTube clips and their sound categories.",id:"agkphysics/AudioSet"}],demo:{inputs:[{filename:"audio.wav",type:"audio"}],outputs:[{data:[{label:"Up",score:.2},{label:"Down",score:.8}],type:"chart"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"An easy-to-use model for command recognition.",id:"speechbrain/google_speech_command_xvector"},{description:"An emotion recognition model.",id:"ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"},{description:"A language identification model.",id:"facebook/mms-lid-126"}],spaces:[{description:"An application that can classify music into different genre.",id:"kurianbenoy/audioclassification"}],summary:"Audio classification is the task of assigning a label or class to a given audio. It can be used for recognizing which command a user is giving or the emotion of a statement, as well as identifying a speaker.",widgetModels:["MIT/ast-finetuned-audioset-10-10-0.4593"],youtubeId:"KWwzcmG98Ds"},Sa=$c;var jc={datasets:[{description:"A dataset containing audio conversations with question\u2013answer pairs.",id:"nvidia/AF-Think"},{description:"A more advanced and comprehensive dataset that contains characteristics of the audio as well",id:"tsinghua-ee/QualiSpeech"}],demo:{inputs:[{filename:"audio.wav",type:"audio"},{label:"Text Prompt",content:"What is the gender of the speaker?",type:"text"}],outputs:[{label:"Generated Text",content:"The gender of the speaker is female.",type:"text"}]},metrics:[],models:[{description:"A lightweight model that has capabilities of taking both audio and text as inputs and generating responses.",id:"fixie-ai/ultravox-v0_5-llama-3_2-1b"},{description:"A multimodal model that supports voice chat and audio analysis.",id:"Qwen/Qwen2-Audio-7B-Instruct"},{description:"A model for audio understanding, speech translation, and transcription.",id:"mistralai/Voxtral-Small-24B-2507"},{description:"A new model capable of audio question answering and reasoning.",id:"nvidia/audio-flamingo-3"}],spaces:[{description:"A space that takes input as both audio and text and generates answers.",id:"iamomtiwari/ATTT"},{description:"A web application that demonstrates chatting with the Qwen2Audio Model.",id:"freddyaboulton/talk-to-qwen-webrtc"}],summary:"Audio-text-to-text models take both an audio clip and a text prompt as input, and generate natural language text as output. These models can answer questions about spoken content, summarize meetings, analyze music, or interpret speech beyond simple transcription. They are useful for applications that combine speech understanding with reasoning or conversation.",widgetModels:[],youtubeId:""},Ra=jc;var qc={datasets:[{description:"512-element X-vector embeddings of speakers from CMU ARCTIC dataset.",id:"Matthijs/cmu-arctic-xvectors"}],demo:{inputs:[{filename:"input.wav",type:"audio"}],outputs:[{filename:"label-0.wav",type:"audio"},{filename:"label-1.wav",type:"audio"}]},metrics:[{description:"The Signal-to-Noise ratio is the relationship between the target signal level and the background noise level. It is calculated as the logarithm of the target signal divided by the background noise, in decibels.",id:"snri"},{description:"The Signal-to-Distortion ratio is the relationship between the target signal and the sum of noise, interference, and artifact errors",id:"sdri"}],models:[{description:"A speech enhancement model.",id:"ResembleAI/resemble-enhance"},{description:"A model that can change the voice in a speech recording.",id:"microsoft/speecht5_vc"}],spaces:[{description:"An application for speech separation.",id:"younver/speechbrain-speech-separation"},{description:"An application for audio style transfer.",id:"nakas/audio-diffusion_style_transfer"}],summary:"Audio-to-Audio is a family of tasks in which the input is an audio and the output is one or multiple generated audios. Some example tasks are speech enhancement and source separation.",widgetModels:["speechbrain/sepformer-wham"],youtubeId:"iohj7nCCYoM"},Ea=qc;var Bc={datasets:[{description:"31,175 hours of multilingual audio-text dataset in 108 languages.",id:"mozilla-foundation/common_voice_17_0"},{description:"Multilingual and diverse audio dataset with 101k hours of audio.",id:"amphion/Emilia-Dataset"},{description:"A dataset with 44.6k hours of English speaker data and 6k hours of other language speakers.",id:"parler-tts/mls_eng"},{description:"A multilingual audio dataset with 370K hours of audio.",id:"espnet/yodas"}],demo:{inputs:[{filename:"input.flac",type:"audio"}],outputs:[{label:"Transcript",content:"Going along slushy country roads and speaking to damp audiences in...",type:"text"}]},metrics:[{description:"",id:"wer"},{description:"",id:"cer"}],models:[{description:"A powerful ASR model by OpenAI.",id:"openai/whisper-large-v3"},{description:"A good generic speech model by MetaAI for fine-tuning.",id:"facebook/w2v-bert-2.0"},{description:"An end-to-end model that performs ASR and Speech Translation by MetaAI.",id:"facebook/seamless-m4t-v2-large"},{description:"A powerful multilingual ASR and Speech Translation model by Nvidia.",id:"nvidia/canary-1b"},{description:"Powerful speaker diarization model.",id:"pyannote/speaker-diarization-3.1"}],spaces:[{description:"A powerful general-purpose speech recognition application.",id:"hf-audio/whisper-large-v3"},{description:"Latest ASR model from Useful Sensors.",id:"mrfakename/Moonshinex"},{description:"A high quality speech and text translation model by Meta.",id:"facebook/seamless_m4t"},{description:"A powerful multilingual ASR and Speech Translation model by Nvidia",id:"nvidia/canary-1b"}],summary:"Automatic Speech Recognition (ASR), also known as Speech to Text (STT), is the task of transcribing a given audio to text. It has many applications, such as voice user interfaces.",widgetModels:["openai/whisper-large-v3"],youtubeId:"TksaY_FDgnk"},Pa=Bc;var Fc={datasets:[{description:"Largest document understanding dataset.",id:"HuggingFaceM4/Docmatix"},{description:"Dataset from the 2020 DocVQA challenge. The documents are taken from the UCSF Industry Documents Library.",id:"eliolio/docvqa"}],demo:{inputs:[{label:"Question",content:"What is the idea behind the consumer relations efficiency team?",type:"text"},{filename:"document-question-answering-input.png",type:"img"}],outputs:[{label:"Answer",content:"Balance cost efficiency with quality customer service",type:"text"}]},metrics:[{description:"The evaluation metric for the DocVQA challenge is the Average Normalized Levenshtein Similarity (ANLS). This metric is flexible to character regognition errors and compares the predicted answer with the ground truth answer.",id:"anls"},{description:"Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",id:"exact-match"}],models:[{description:"A robust document question answering model.",id:"impira/layoutlm-document-qa"},{description:"A document question answering model specialized in invoices.",id:"impira/layoutlm-invoices"},{description:"A special model for OCR-free document question answering.",id:"microsoft/udop-large"},{description:"A powerful model for document question answering.",id:"google/pix2struct-docvqa-large"}],spaces:[{description:"A robust document question answering application.",id:"impira/docquery"},{description:"An application that can answer questions from invoices.",id:"impira/invoices"},{description:"An application to compare different document question answering models.",id:"merve/compare_docvqa_models"}],summary:"Document Question Answering (also known as Document Visual Question Answering) is the task of answering questions on document images. Document question answering models take a (document, question) pair as input and return an answer in natural language. Models usually rely on multi-modal features, combining text, position of words (bounding-boxes) and image.",widgetModels:["impira/layoutlm-invoices"],youtubeId:""},Ca=Fc;var Vc={datasets:[{description:"Wikipedia dataset containing cleaned articles of all languages. Can be used to train `feature-extraction` models.",id:"wikipedia"}],demo:{inputs:[{label:"Input",content:"India, officially the Republic of India, is a country in South Asia.",type:"text"}],outputs:[{table:[["Dimension 1","Dimension 2","Dimension 3"],["2.583383083343506","2.757075071334839","0.9023529887199402"],["8.29393482208252","1.1071064472198486","2.03399395942688"],["-0.7754912972450256","-1.647324562072754","-0.6113331913948059"],["0.07087723910808563","1.5942802429199219","1.4610432386398315"]],type:"tabular"}]},metrics:[],models:[{description:"A powerful feature extraction model for natural language processing tasks.",id:"thenlper/gte-large"},{description:"A strong feature extraction model for retrieval.",id:"Alibaba-NLP/gte-Qwen1.5-7B-instruct"}],spaces:[{description:"A leaderboard to rank text feature extraction models based on a benchmark.",id:"mteb/leaderboard"},{description:"A leaderboard to rank best feature extraction models based on human feedback.",id:"mteb/arena"}],summary:"Feature extraction is the task of extracting features learnt in a model.",widgetModels:["facebook/bart-base"]},La=Vc;var Hc={datasets:[{description:"A common dataset that is used to train models for many languages.",id:"wikipedia"},{description:"A large English dataset with text crawled from the web.",id:"c4"}],demo:{inputs:[{label:"Input",content:"The <mask> barked at me",type:"text"}],outputs:[{type:"chart",data:[{label:"wolf",score:.487},{label:"dog",score:.061},{label:"cat",score:.058},{label:"fox",score:.047},{label:"squirrel",score:.025}]}]},metrics:[{description:"Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",id:"cross_entropy"},{description:"Perplexity is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",id:"perplexity"}],models:[{description:"State-of-the-art masked language model.",id:"answerdotai/ModernBERT-large"},{description:"A multilingual model trained on 100 languages.",id:"FacebookAI/xlm-roberta-base"}],spaces:[],summary:"Masked language modeling is the task of masking some of the words in a sentence and predicting which words should replace those masks. These models are useful when we want to get a statistical understanding of the language in which the model is trained in.",widgetModels:["distilroberta-base"],youtubeId:"mqElG5QJWUg"},Ua=Hc;var Xc={datasets:[{description:"Benchmark dataset used for image classification with images that belong to 100 classes.",id:"cifar100"},{description:"Dataset consisting of images of garments.",id:"fashion_mnist"}],demo:{inputs:[{filename:"image-classification-input.jpeg",type:"img"}],outputs:[{type:"chart",data:[{label:"Egyptian cat",score:.514},{label:"Tabby cat",score:.193},{label:"Tiger cat",score:.068}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"A strong image classification model.",id:"google/vit-base-patch16-224"},{description:"A robust image classification model.",id:"facebook/deit-base-distilled-patch16-224"},{description:"A strong image classification model.",id:"facebook/convnext-large-224"}],spaces:[{description:"A leaderboard to evaluate different image classification models.",id:"timm/leaderboard"}],summary:"Image classification is the task of assigning a label or class to an entire image. Images are expected to have only one class for each image. Image classification models take an image as input and return a prediction about which class the image belongs to.",widgetModels:["google/vit-base-patch16-224"],youtubeId:"tjAIM7BOYhw"},Ma=Xc;var Yc={datasets:[{description:"ImageNet-1K is a image classification dataset in which images are used to train image-feature-extraction models.",id:"imagenet-1k"}],demo:{inputs:[{filename:"mask-generation-input.png",type:"img"}],outputs:[{table:[["Dimension 1","Dimension 2","Dimension 3"],["0.21236686408519745","1.0919708013534546","0.8512550592422485"],["0.809657871723175","-0.18544459342956543","-0.7851548194885254"],["1.3103108406066895","-0.2479034662246704","-0.9107287526130676"],["1.8536205291748047","-0.36419737339019775","0.09717650711536407"]],type:"tabular"}]},metrics:[],models:[{description:"A powerful image feature extraction model.",id:"timm/vit_large_patch14_dinov2.lvd142m"},{description:"A strong image feature extraction model.",id:"nvidia/MambaVision-T-1K"},{description:"A robust image feature extraction model.",id:"facebook/dino-vitb16"},{description:"Cutting-edge image feature extraction model.",id:"apple/aimv2-large-patch14-336-distilled"},{description:"Strong image feature extraction model that can be used on images and documents.",id:"OpenGVLab/InternViT-6B-448px-V1-2"}],spaces:[{description:"A leaderboard to evaluate different image-feature-extraction models on classification performances",id:"timm/leaderboard"}],summary:"Image feature extraction is the task of extracting features learnt in a computer vision model.",widgetModels:[]},Oa=Yc;var zc={datasets:[{description:"Synthetic dataset, for image relighting",id:"VIDIT"},{description:"Multiple images of celebrities, used for facial expression translation",id:"huggan/CelebA-faces"},{description:"12M image-caption pairs.",id:"Spawning/PD12M"}],demo:{inputs:[{filename:"image-to-image-input.jpeg",type:"img"}],outputs:[{filename:"image-to-image-output.png",type:"img"}]},isPlaceholder:!1,metrics:[{description:"Peak Signal to Noise Ratio (PSNR) is an approximation of the human perception, considering the ratio of the absolute intensity with respect to the variations. Measured in dB, a high value indicates a high fidelity.",id:"PSNR"},{description:"Structural Similarity Index (SSIM) is a perceptual metric which compares the luminance, contrast and structure of two images. The values of SSIM range between -1 and 1, and higher values indicate closer resemblance to the original image.",id:"SSIM"},{description:"Inception Score (IS) is an analysis of the labels predicted by an image classification model when presented with a sample of the generated images.",id:"IS"}],models:[{description:"An image-to-image model to improve image resolution.",id:"fal/AuraSR-v2"},{description:"Powerful image editing model.",id:"black-forest-labs/FLUX.1-Kontext-dev"},{description:"Virtual try-on model.",id:"yisol/IDM-VTON"},{description:"Image re-lighting model.",id:"kontext-community/relighting-kontext-dev-lora-v3"},{description:"Strong model for inpainting and outpainting.",id:"black-forest-labs/FLUX.1-Fill-dev"},{description:"Strong model for image editing using depth maps.",id:"black-forest-labs/FLUX.1-Depth-dev-lora"}],spaces:[{description:"Image editing application.",id:"black-forest-labs/FLUX.1-Kontext-Dev"},{description:"Image relighting application.",id:"lllyasviel/iclight-v2-vary"},{description:"An application for image upscaling.",id:"jasperai/Flux.1-dev-Controlnet-Upscaler"}],summary:"Image-to-image is the task of transforming an input image through a variety of possible manipulations and enhancements, such as super-resolution, image inpainting, colorization, and more.",widgetModels:["Qwen/Qwen-Image"],youtubeId:""},Da=zc;var Wc={datasets:[{description:"Dataset from 12M image-text of Reddit",id:"red_caps"},{description:"Dataset from 3.3M images of Google",id:"datasets/conceptual_captions"}],demo:{inputs:[{filename:"savanna.jpg",type:"img"}],outputs:[{label:"Detailed description",content:"a herd of giraffes and zebras grazing in a field",type:"text"}]},metrics:[],models:[{description:"Strong OCR model.",id:"allenai/olmOCR-7B-0725"},{description:"Powerful image captioning model.",id:"fancyfeast/llama-joycaption-beta-one-hf-llava"}],spaces:[{description:"SVG generator app from images.",id:"multimodalart/OmniSVG-3B"},{description:"An application that converts documents to markdown.",id:"numind/NuMarkdown-8B-Thinking"},{description:"An application that can caption images.",id:"fancyfeast/joy-caption-beta-one"}],summary:"Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text.",widgetModels:["Salesforce/blip-image-captioning-large"],youtubeId:""},Na=Wc;var Kc={datasets:[{description:"Instructions composed of image and text.",id:"liuhaotian/LLaVA-Instruct-150K"},{description:"Collection of image-text pairs on scientific topics.",id:"DAMO-NLP-SG/multimodal_textbook"},{description:"A collection of datasets made for model fine-tuning.",id:"HuggingFaceM4/the_cauldron"},{description:"Screenshots of websites with their HTML/CSS codes.",id:"HuggingFaceM4/WebSight"}],demo:{inputs:[{filename:"image-text-to-text-input.png",type:"img"},{label:"Text Prompt",content:"Describe the position of the bee in detail.",type:"text"}],outputs:[{label:"Answer",content:"The bee is sitting on a pink flower, surrounded by other flowers. The bee is positioned in the center of the flower, with its head and front legs sticking out.",type:"text"}]},metrics:[],models:[{description:"Small and efficient yet powerful vision language model.",id:"HuggingFaceTB/SmolVLM-Instruct"},{description:"Cutting-edge reasoning vision language model.",id:"zai-org/GLM-4.5V"},{description:"Cutting-edge small vision language model to convert documents to text.",id:"rednote-hilab/dots.ocr"},{description:"Small yet powerful model.",id:"Qwen/Qwen2.5-VL-3B-Instruct"},{description:"Image-text-to-text model with agentic capabilities.",id:"microsoft/Magma-8B"}],spaces:[{description:"Leaderboard to evaluate vision language models.",id:"opencompass/open_vlm_leaderboard"},{description:"An application that compares object detection capabilities of different vision language models.",id:"sergiopaniego/vlm_object_understanding"},{description:"An application to compare different OCR models.",id:"prithivMLmods/Multimodal-OCR"}],summary:"Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.",widgetModels:["zai-org/GLM-4.5V"],youtubeId:"IoGaGfU1CIg"},$a=Kc;var Qc={datasets:[],demo:{inputs:[{filename:"image-text-to-image-input.jpeg",type:"img"},{label:"Input",content:"A city above clouds, pastel colors, Victorian style",type:"text"}],outputs:[{filename:"image-text-to-image-output.png",type:"img"}]},metrics:[{description:"The Fr\xE9chet Inception Distance (FID) calculates the distance between distributions between synthetic and real samples. A lower FID score indicates better similarity between the distributions of real and generated images.",id:"FID"},{description:"CLIP Score measures the similarity between the generated image and the text prompt using CLIP embeddings. A higher score indicates better alignment with the text prompt.",id:"CLIP"}],models:[{description:"A powerful model for image-text-to-image generation.",id:"black-forest-labs/FLUX.2-dev"}],spaces:[{description:"An application for image-text-to-image generation.",id:"black-forest-labs/FLUX.2-dev"}],summary:"Image-text-to-image models take an image and a text prompt as input and generate a new image based on the reference image and text instructions. These models are useful for image editing, style transfer, image variations, and guided image generation tasks.",widgetModels:["black-forest-labs/FLUX.2-dev"],youtubeId:void 0},ja=Qc;var Jc={datasets:[],demo:{inputs:[{filename:"image-text-to-video-input.jpg",type:"img"},{label:"Input",content:"Darth Vader is surfing on the waves.",type:"text"}],outputs:[{filename:"image-text-to-video-output.gif",type:"img"}]},metrics:[{description:"Frechet Video Distance uses a model that captures coherence for changes in frames and the quality of each frame. A smaller score indicates better video generation.",id:"fvd"},{description:"CLIPSIM measures similarity between video frames and text using an image-text similarity model. A higher score indicates better video generation.",id:"clipsim"}],models:[{description:"A powerful model for image-text-to-video generation.",id:"Lightricks/LTX-Video"}],spaces:[{description:"An application for image-text-to-video generation.",id:"Lightricks/ltx-video-distilled"}],summary:"Image-text-to-video models take an reference image and a text instructions as and generate a video based on them. These models are useful for animating still images, creating dynamic content from static references, and generating videos with specific motion or transformation guidance.",widgetModels:["Lightricks/LTX-Video"],youtubeId:void 0},qa=Jc;var Gc={datasets:[{description:"Scene segmentation dataset.",id:"scene_parse_150"}],demo:{inputs:[{filename:"image-segmentation-input.jpeg",type:"img"}],outputs:[{filename:"image-segmentation-output.png",type:"img"}]},metrics:[{description:"Average Precision (AP) is the Area Under the PR Curve (AUC-PR). It is calculated for each semantic class separately",id:"Average Precision"},{description:"Mean Average Precision (mAP) is the overall average of the AP values",id:"Mean Average Precision"},{description:"Intersection over Union (IoU) is the overlap of segmentation masks. Mean IoU is the average of the IoU of all semantic classes",id:"Mean Intersection over Union"},{description:"AP\u03B1 is the Average Precision at the IoU threshold of a \u03B1 value, for example, AP50 and AP75",id:"AP\u03B1"}],models:[{description:"Solid panoptic segmentation model trained on COCO.",id:"tue-mps/coco_panoptic_eomt_large_640"},{description:"Background removal model.",id:"briaai/RMBG-1.4"},{description:"A multipurpose image segmentation model for high resolution images.",id:"ZhengPeng7/BiRefNet"},{description:"Powerful human-centric image segmentation model.",id:"facebook/sapiens-seg-1b"},{description:"Panoptic segmentation model trained on the COCO (common objects) dataset.",id:"facebook/mask2former-swin-large-coco-panoptic"}],spaces:[{description:"A semantic segmentation application that can predict unseen instances out of the box.",id:"facebook/ov-seg"},{description:"One of the strongest segmentation applications.",id:"jbrinkma/segment-anything"},{description:"A human-centric segmentation model.",id:"facebook/sapiens-pose"},{description:"An instance segmentation application to predict neuronal cell types from microscopy images.",id:"rashmi/sartorius-cell-instance-segmentation"},{description:"An application that segments videos.",id:"ArtGAN/Segment-Anything-Video"},{description:"An panoptic segmentation application built for outdoor environments.",id:"segments/panoptic-segment-anything"}],summary:"Image Segmentation divides an image into segments where each pixel in the image is mapped to an object. This task has multiple variants such as instance segmentation, panoptic segmentation and semantic segmentation.",widgetModels:["nvidia/segformer-b0-finetuned-ade-512-512"],youtubeId:"dKE8SIt9C-w"},Ba=Gc;var Zc={datasets:[{description:"A benchmark dataset for reference image controlled video generation.",id:"ali-vilab/VACE-Benchmark"},{description:"A dataset of video generation style preferences.",id:"Rapidata/sora-video-generation-style-likert-scoring"},{description:"A dataset with videos and captions throughout the videos.",id:"BestWishYsh/ChronoMagic"}],demo:{inputs:[{filename:"image-to-video-input.jpg",type:"img"},{label:"Optional Text Prompt",content:"This penguin is dancing",type:"text"}],outputs:[{filename:"image-to-video-output.gif",type:"img"}]},metrics:[{description:"Fr\xE9chet Video Distance (FVD) measures the perceptual similarity between the distributions of generated videos and a set of real videos, assessing overall visual quality and temporal coherence of the video generated from an input image.",id:"fvd"},{description:"CLIP Score measures the semantic similarity between a textual prompt (if provided alongside the input image) and the generated video frames. It evaluates how well the video's generated content and motion align with the textual description, conditioned on the initial image.",id:"clip_score"},{description:"First Frame Fidelity, often measured using LPIPS (Learned Perceptual Image Patch Similarity), PSNR, or SSIM, quantifies how closely the first frame of the generated video matches the input conditioning image.",id:"lpips"},{description:"Identity Preservation Score measures the consistency of identity (e.g., a person's face or a specific object's characteristics) between the input image and throughout the generated video frames, often calculated using features from specialized models like face recognition (e.g., ArcFace) or re-identification models.",id:"identity_preservation"},{description:"Motion Score evaluates the quality, realism, and temporal consistency of motion in the video generated from a static image. This can be based on optical flow analysis (e.g., smoothness, magnitude), consistency of object trajectories, or specific motion plausibility assessments.",id:"motion_score"}],models:[{description:"LTX-Video, a 13B parameter model for high quality video generation",id:"Lightricks/LTX-Video-0.9.7-dev"},{description:"A 14B parameter model for reference image controlled video generation",id:"Wan-AI/Wan2.1-VACE-14B"},{description:"An image-to-video generation model using FramePack F1 methodology with Hunyuan-DiT architecture",id:"lllyasviel/FramePack_F1_I2V_HY_20250503"},{description:"A distilled version of the LTX-Video-0.9.7-dev model for faster inference",id:"Lightricks/LTX-Video-0.9.7-distilled"},{description:"An image-to-video generation model by Skywork AI, 14B parameters, producing 720p videos.",id:"Skywork/SkyReels-V2-I2V-14B-720P"},{description:"Image-to-video variant of Tencent's HunyuanVideo.",id:"tencent/HunyuanVideo-I2V"},{description:"A 14B parameter model for 720p image-to-video generation by Wan-AI.",id:"Wan-AI/Wan2.1-I2V-14B-720P"},{description:"A Diffusers version of the Wan2.1-I2V-14B-720P model for 720p image-to-video generation.",id:"Wan-AI/Wan2.1-I2V-14B-720P-Diffusers"}],spaces:[{description:"An application to generate videos fast.",id:"Lightricks/ltx-video-distilled"},{description:"Generate videos with the FramePack-F1",id:"linoyts/FramePack-F1"},{description:"Generate videos with the FramePack",id:"lisonallen/framepack-i2v"},{description:"Wan2.1 with CausVid LoRA",id:"multimodalart/wan2-1-fast"},{description:"A demo for Stable Video Diffusion",id:"multimodalart/stable-video-diffusion"}],summary:"Image-to-video models take a still image as input and generate a video. These models can be guided by text prompts to influence the content and style of the output video.",widgetModels:[],youtubeId:void 0},Fa=Zc;var ed={datasets:[{description:"Widely used benchmark dataset for multiple Vision tasks.",id:"merve/coco2017"},{description:"Medical Imaging dataset of the Human Brain for segmentation and mask generating tasks",id:"rocky93/BraTS_segmentation"}],demo:{inputs:[{filename:"mask-generation-input.png",type:"img"}],outputs:[{filename:"mask-generation-output.png",type:"img"}]},metrics:[{description:"IoU is used to measure the overlap between predicted mask and the ground truth mask.",id:"Intersection over Union (IoU)"}],models:[{description:"Small yet powerful mask generation model.",id:"Zigeng/SlimSAM-uniform-50"},{description:"Very strong mask generation model.",id:"facebook/sam2-hiera-large"}],spaces:[{description:"An application that combines a mask generation model with a zero-shot object detection model for text-guided image segmentation.",id:"merve/OWLSAM2"},{description:"An application that compares the performance of a large and a small mask generation model.",id:"merve/slimsam"},{description:"An application based on an improved mask generation model.",id:"SkalskiP/segment-anything-model-2"},{description:"An application to remove objects from videos using mask generation models.",id:"SkalskiP/SAM_and_ProPainter"}],summary:"Mask generation is the task of generating masks that identify a specific object or region of interest in a given image. Masks are often used in segmentation tasks, where they provide a precise way to isolate the object of interest for further processing or analysis.",widgetModels:[],youtubeId:""},Va=ed;var td={datasets:[{description:"Widely used benchmark dataset for multiple vision tasks.",id:"merve/coco2017"},{description:"Multi-task computer vision benchmark.",id:"merve/pascal-voc"}],demo:{inputs:[{filename:"object-detection-input.jpg",type:"img"}],outputs:[{filename:"object-detection-output.jpg",type:"img"}]},metrics:[{description:"The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",id:"Average Precision"},{description:"The Mean Average Precision (mAP) metric is the overall average of the AP values",id:"Mean Average Precision"},{description:"The AP\u03B1 metric is the Average Precision at the IoU threshold of a \u03B1 value, for example, AP50 and AP75",id:"AP\u03B1"}],models:[{description:"Solid object detection model pre-trained on the COCO 2017 dataset.",id:"facebook/detr-resnet-50"},{description:"Accurate object detection model.",id:"IDEA-Research/dab-detr-resnet-50"},{description:"Fast and accurate object detection model.",id:"PekingU/rtdetr_v2_r50vd"},{description:"Object detection model for low-lying objects.",id:"StephanST/WALDO30"}],spaces:[{description:"Real-time object detection demo.",id:"Roboflow/RF-DETR"},{description:"An application that contains various object detection models to try from.",id:"Gradio-Blocks/Object-Detection-With-DETR-and-YOLOS"},{description:"A cutting-edge object detection application.",id:"sunsmarterjieleaf/yolov12"},{description:"An object tracking, segmentation and inpainting application.",id:"VIPLab/Track-Anything"},{description:"Very fast object tracking application based on object detection.",id:"merve/RT-DETR-tracking-coco"}],summary:"Object Detection models allow users to identify objects of certain defined classes. Object detection models receive an image as input and output the images with bounding boxes and labels on detected objects.",widgetModels:["facebook/detr-resnet-50"],youtubeId:"WdAeKSOpxhw"},Ha=td;var od={datasets:[{description:"NYU Depth V2 Dataset: Video dataset containing both RGB and depth sensor data.",id:"sayakpaul/nyu_depth_v2"},{description:"Monocular depth estimation benchmark based without noise and errors.",id:"depth-anything/DA-2K"}],demo:{inputs:[{filename:"depth-estimation-input.jpg",type:"img"}],outputs:[{filename:"depth-estimation-output.png",type:"img"}]},metrics:[],models:[{description:"Cutting-edge depth estimation model.",id:"depth-anything/Depth-Anything-V2-Large"},{description:"A strong monocular depth estimation model.",id:"jingheya/lotus-depth-g-v1-0"},{description:"A depth estimation model that predicts depth in videos.",id:"tencent/DepthCrafter"},{description:"A robust depth estimation model.",id:"apple/DepthPro-hf"}],spaces:[{description:"An application that predicts the depth of an image and then reconstruct the 3D model as voxels.",id:"radames/dpt-depth-estimation-3d-voxels"},{description:"An application for bleeding-edge depth estimation.",id:"akhaliq/depth-pro"},{description:"An application on cutting-edge depth estimation in videos.",id:"tencent/DepthCrafter"},{description:"A human-centric depth estimation application.",id:"facebook/sapiens-depth"}],summary:"Depth estimation is the task of predicting depth of the objects present in an image.",widgetModels:[""],youtubeId:""},Xa=od;var rd={datasets:[],demo:{inputs:[],outputs:[]},isPlaceholder:!0,metrics:[],models:[],spaces:[],summary:"",widgetModels:[],youtubeId:void 0,canonicalId:void 0},Ya=rd;var ad={datasets:[{description:"A curation of widely used datasets for Data Driven Deep Reinforcement Learning (D4RL)",id:"edbeeching/decision_transformer_gym_replay"}],demo:{inputs:[{label:"State",content:"Red traffic light, pedestrians are about to pass.",type:"text"}],outputs:[{label:"Action",content:"Stop the car.",type:"text"},{label:"Next State",content:"Yellow light, pedestrians have crossed.",type:"text"}]},metrics:[{description:"Accumulated reward across all time steps discounted by a factor that ranges between 0 and 1 and determines how much the agent optimizes for future relative to immediate rewards. Measures how good is the policy ultimately found by a given algorithm considering uncertainty over the future.",id:"Discounted Total Reward"},{description:"Average return obtained after running the policy for a certain number of evaluation episodes. As opposed to total reward, mean reward considers how much reward a given algorithm receives while learning.",id:"Mean Reward"},{description:"Measures how good a given algorithm is after a predefined time. Some algorithms may be guaranteed to converge to optimal behavior across many time steps. However, an agent that reaches an acceptable level of optimality after a given time horizon may be preferable to one that ultimately reaches optimality but takes a long time.",id:"Level of Performance After Some Time"}],models:[{description:"A Reinforcement Learning model trained on expert data from the Gym Hopper environment",id:"edbeeching/decision-transformer-gym-hopper-expert"},{description:"A PPO agent playing seals/CartPole-v0 using the stable-baselines3 library and the RL Zoo.",id:"HumanCompatibleAI/ppo-seals-CartPole-v0"}],spaces:[{description:"An application for a cute puppy agent learning to catch a stick.",id:"ThomasSimonini/Huggy"},{description:"An application to play Snowball Fight with a reinforcement learning agent.",id:"ThomasSimonini/SnowballFight"}],summary:"Reinforcement learning is the computational approach of learning from action by interacting with an environment through trial and error and receiving rewards (negative or positive) as feedback",widgetModels:[],youtubeId:"q0BiUn5LiBc"},za=ad;var nd={datasets:[{description:"A famous question answering dataset based on English articles from Wikipedia.",id:"squad_v2"},{description:"A dataset of aggregated anonymized actual queries issued to the Google search engine.",id:"natural_questions"}],demo:{inputs:[{label:"Question",content:"Which name is also used to describe the Amazon rainforest in English?",type:"text"},{label:"Context",content:"The Amazon rainforest, also known in English as Amazonia or the Amazon Jungle",type:"text"}],outputs:[{label:"Answer",content:"Amazonia",type:"text"}]},metrics:[{description:"Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",id:"exact-match"},{description:" The F1-Score metric is useful if we value both false positives and false negatives equally. The F1-Score is calculated on each word in the predicted sequence against the correct answer",id:"f1"}],models:[{description:"A robust baseline model for most question answering domains.",id:"deepset/roberta-base-squad2"},{description:"Small yet robust model that can answer questions.",id:"distilbert/distilbert-base-cased-distilled-squad"},{description:"A special model that can answer questions from tables.",id:"google/tapas-base-finetuned-wtq"}],spaces:[{description:"An application that can answer a long question from Wikipedia.",id:"deepset/wikipedia-assistant"}],summary:"Question Answering models can retrieve the answer to a question from a given text, which is useful for searching for an answer in a document. Some question answering models can generate answers without context!",widgetModels:["deepset/roberta-base-squad2"],youtubeId:"ajPx5LwJD-I"},Wa=nd;var id={datasets:[{description:"Bing queries with relevant passages from various web sources.",id:"microsoft/ms_marco"}],demo:{inputs:[{label:"Source sentence",content:"Machine learning is so easy.",type:"text"},{label:"Sentences to compare to",content:"Deep learning is so straightforward.",type:"text"},{label:"",content:"This is so difficult, like rocket science.",type:"text"},{label:"",content:"I can't believe how much I struggled with this.",type:"text"}],outputs:[{type:"chart",data:[{label:"Deep learning is so straightforward.",score:.623},{label:"This is so difficult, like rocket science.",score:.413},{label:"I can't believe how much I struggled with this.",score:.256}]}]},metrics:[{description:"Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",id:"Mean Reciprocal Rank"},{description:"The similarity of the embeddings is evaluated mainly on cosine similarity. It is calculated as the cosine of the angle between two vectors. It is particularly useful when your texts are not the same length",id:"Cosine Similarity"}],models:[{description:"This model works well for sentences and paragraphs and can be used for clustering/grouping and semantic searches.",id:"sentence-transformers/all-mpnet-base-v2"},{description:"A multilingual robust sentence similarity model.",id:"BAAI/bge-m3"},{description:"A robust sentence similarity model.",id:"HIT-TMG/KaLM-embedding-multilingual-mini-instruct-v1.5"}],spaces:[{description:"An application that leverages sentence similarity to answer questions from YouTube videos.",id:"Gradio-Blocks/Ask_Questions_To_YouTube_Videos"},{description:"An application that retrieves relevant PubMed abstracts for a given online article which can be used as further references.",id:"Gradio-Blocks/pubmed-abstract-retriever"},{description:"An application that leverages sentence similarity to summarize text.",id:"nickmuchi/article-text-summarizer"},{description:"A guide that explains how Sentence Transformers can be used for semantic search.",id:"sentence-transformers/Sentence_Transformers_for_semantic_search"}],summary:"Sentence Similarity is the task of determining how similar two texts are. Sentence similarity models convert input texts into vectors (embeddings) that capture semantic information and calculate how close (similar) they are between them. This task is particularly useful for information retrieval and clustering/grouping.",widgetModels:["sentence-transformers/all-MiniLM-L6-v2"],youtubeId:"VCZq5AkbNEU"},Ka=id;var sd={canonicalId:"text-generation",datasets:[{description:"News articles in five different languages along with their summaries. Widely used for benchmarking multilingual summarization models.",id:"mlsum"},{description:"English conversations and their summaries. Useful for benchmarking conversational agents.",id:"samsum"}],demo:{inputs:[{label:"Input",content:"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.",type:"text"}],outputs:[{label:"Output",content:"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building. It was the first structure to reach a height of 300 metres.",type:"text"}]},metrics:[{description:"The generated sequence is compared against its summary, and the overlap of tokens are counted. ROUGE-N refers to overlap of N subsequent tokens, ROUGE-1 refers to overlap of single tokens and ROUGE-2 is the overlap of two subsequent tokens.",id:"rouge"}],models:[{description:"A strong summarization model trained on English news articles. Excels at generating factual summaries.",id:"facebook/bart-large-cnn"},{description:"A summarization model trained on medical articles.",id:"Falconsai/medical_summarization"}],spaces:[{description:"An application that can summarize long paragraphs.",id:"pszemraj/summarize-long-text"},{description:"A much needed summarization application for terms and conditions.",id:"ml6team/distilbart-tos-summarizer-tosdr"},{description:"An application that summarizes long documents.",id:"pszemraj/document-summarization"},{description:"An application that can detect errors in abstractive summarization.",id:"ml6team/post-processing-summarization"}],summary:"Summarization is the task of producing a shorter version of a document while preserving its important information. Some models can extract text from the original input, while other models can generate entirely new text.",widgetModels:["facebook/bart-large-cnn"],youtubeId:"yHnr5Dk2zCI"},Qa=sd;var ld={datasets:[{description:"The WikiTableQuestions dataset is a large-scale dataset for the task of question answering on semi-structured tables.",id:"wikitablequestions"},{description:"WikiSQL is a dataset of 80654 hand-annotated examples of questions and SQL queries distributed across 24241 tables from Wikipedia.",id:"wikisql"}],demo:{inputs:[{table:[["Rank","Name","No.of reigns","Combined days"],["1","lou Thesz","3","3749"],["2","Ric Flair","8","3103"],["3","Harley Race","7","1799"]],type:"tabular"},{label:"Question",content:"What is the number of reigns for Harley Race?",type:"text"}],outputs:[{label:"Result",content:"7",type:"text"}]},metrics:[{description:"Checks whether the predicted answer(s) is the same as the ground-truth answer(s).",id:"Denotation Accuracy"}],models:[{description:"A table question answering model that is capable of neural SQL execution, i.e., employ TAPEX to execute a SQL query on a given table.",id:"microsoft/tapex-base"},{description:"A robust table question answering model.",id:"google/tapas-base-finetuned-wtq"}],spaces:[{description:"An application that answers questions based on table CSV files.",id:"katanaml/table-query"}],summary:"Table Question Answering (Table QA) is the answering a question about an information on a given table.",widgetModels:["google/tapas-base-finetuned-wtq"]},Ja=ld;var pd={datasets:[{description:"A comprehensive curation of datasets covering all benchmarks.",id:"inria-soda/tabular-benchmark"}],demo:{inputs:[{table:[["Glucose","Blood Pressure ","Skin Thickness","Insulin","BMI"],["148","72","35","0","33.6"],["150","50","30","0","35.1"],["141","60","29","1","39.2"]],type:"tabular"}],outputs:[{table:[["Diabetes"],["1"],["1"],["0"]],type:"tabular"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"Breast cancer prediction model based on decision trees.",id:"scikit-learn/cancer-prediction-trees"}],spaces:[{description:"An application that can predict defective products on a production line.",id:"scikit-learn/tabular-playground"},{description:"An application that compares various tabular classification techniques on different datasets.",id:"scikit-learn/classification"}],summary:"Tabular classification is the task of classifying a target category (a group) based on set of attributes.",widgetModels:["scikit-learn/tabular-playground"],youtubeId:""},Ga=pd;var cd={datasets:[{description:"A comprehensive curation of datasets covering all benchmarks.",id:"inria-soda/tabular-benchmark"}],demo:{inputs:[{table:[["Car Name","Horsepower","Weight"],["ford torino","140","3,449"],["amc hornet","97","2,774"],["toyota corolla","65","1,773"]],type:"tabular"}],outputs:[{table:[["MPG (miles per gallon)"],["17"],["18"],["31"]],type:"tabular"}]},metrics:[{description:"",id:"mse"},{description:"Coefficient of determination (or R-squared) is a measure of how well the model fits the data. Higher R-squared is considered a better fit.",id:"r-squared"}],models:[{description:"Fish weight prediction based on length measurements and species.",id:"scikit-learn/Fish-Weight"}],spaces:[{description:"An application that can predict weight of a fish based on set of attributes.",id:"scikit-learn/fish-weight-prediction"}],summary:"Tabular regression is the task of predicting a numerical value given a set of attributes.",widgetModels:["scikit-learn/Fish-Weight"],youtubeId:""},Za=cd;var dd={datasets:[{description:"RedCaps is a large-scale dataset of 12M image-text pairs collected from Reddit.",id:"red_caps"},{description:"Conceptual Captions is a dataset consisting of ~3.3M images annotated with captions.",id:"conceptual_captions"},{description:"12M image-caption pairs.",id:"Spawning/PD12M"}],demo:{inputs:[{label:"Input",content:"A city above clouds, pastel colors, Victorian style",type:"text"}],outputs:[{filename:"image.jpeg",type:"img"}]},metrics:[{description:"The Inception Score (IS) measure assesses diversity and meaningfulness. It uses a generated image sample to predict its label. A higher score signifies more diverse and meaningful images.",id:"IS"},{description:"The Fr\xE9chet Inception Distance (FID) calculates the distance between distributions between synthetic and real samples. A lower FID score indicates better similarity between the distributions of real and generated images.",id:"FID"},{description:"R-precision assesses how the generated image aligns with the provided text description. It uses the generated images as queries to retrieve relevant text descriptions. The top 'r' relevant descriptions are selected and used to calculate R-precision as r/R, where 'R' is the number of ground truth descriptions associated with the generated images. A higher R-precision value indicates a better model.",id:"R-Precision"}],models:[{description:"One of the most powerful image generation models that can generate realistic outputs.",id:"black-forest-labs/FLUX.1-Krea-dev"},{description:"A powerful image generation model.",id:"Qwen/Qwen-Image"},{description:"Powerful and fast image generation model.",id:"ByteDance/SDXL-Lightning"},{description:"A powerful text-to-image model.",id:"ByteDance/Hyper-SD"}],spaces:[{description:"A powerful text-to-image application.",id:"stabilityai/stable-diffusion-3-medium"},{description:"A text-to-image application to generate comics.",id:"jbilcke-hf/ai-comic-factory"},{description:"An application to match multiple custom image generation models.",id:"multimodalart/flux-lora-lab"},{description:"A powerful yet very fast image generation application.",id:"latent-consistency/lcm-lora-for-sdxl"},{description:"A gallery to explore various text-to-image models.",id:"multimodalart/LoraTheExplorer"},{description:"An application for `text-to-image`, `image-to-image` and image inpainting.",id:"ArtGAN/Stable-Diffusion-ControlNet-WebUI"},{description:"An application to generate realistic images given photos of a person and a prompt.",id:"InstantX/InstantID"}],summary:"Text-to-image is the task of generating images from input text. These pipelines can also be used to modify and edit images based on text prompts.",widgetModels:["black-forest-labs/FLUX.1-dev"],youtubeId:""},en=dd;var md={canonicalId:"text-to-audio",datasets:[{description:"10K hours of multi-speaker English dataset.",id:"parler-tts/mls_eng_10k"},{description:"Multi-speaker English dataset.",id:"mythicinfinity/libritts_r"},{description:"Multi-lingual dataset.",id:"facebook/multilingual_librispeech"}],demo:{inputs:[{label:"Input",content:"I love audio models on the Hub!",type:"text"}],outputs:[{filename:"audio.wav",type:"audio"}]},metrics:[{description:"The Mel Cepstral Distortion (MCD) metric is used to calculate the quality of generated speech.",id:"mel cepstral distortion"}],models:[{description:"Small yet powerful TTS model.",id:"KittenML/kitten-tts-nano-0.1"},{description:"Bleeding edge TTS model.",id:"ResembleAI/chatterbox"},{description:"A massively multi-lingual TTS model.",id:"fishaudio/fish-speech-1.5"},{description:"A text-to-dialogue model.",id:"nari-labs/Dia-1.6B-0626"}],spaces:[{description:"An application for generate high quality speech in different languages.",id:"hexgrad/Kokoro-TTS"},{description:"A multilingual text-to-speech application.",id:"fishaudio/fish-speech-1"},{description:"Performant TTS application.",id:"ResembleAI/Chatterbox"},{description:"An application to compare different TTS models.",id:"TTS-AGI/TTS-Arena-V2"},{description:"An application that generates podcast episodes.",id:"ngxson/kokoro-podcast-generator"}],summary:"Text-to-Speech (TTS) is the task of generating natural sounding speech given text input. TTS models can be extended to have a single model that generates speech for multiple speakers and multiple languages.",widgetModels:["suno/bark"],youtubeId:"NW62DpzJ274"},tn=md;var ud={datasets:[{description:"A widely used dataset useful to benchmark named entity recognition models.",id:"eriktks/conll2003"},{description:"A multilingual dataset of Wikipedia articles annotated for named entity recognition in over 150 different languages.",id:"unimelb-nlp/wikiann"}],demo:{inputs:[{label:"Input",content:"My name is Omar and I live in Z\xFCrich.",type:"text"}],outputs:[{text:"My name is Omar and I live in Z\xFCrich.",tokens:[{type:"PERSON",start:11,end:15},{type:"GPE",start:30,end:36}],type:"text-with-tokens"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"A robust performance model to identify people, locations, organizations and names of miscellaneous entities.",id:"dslim/bert-base-NER"},{description:"A strong model to identify people, locations, organizations and names in multiple languages.",id:"FacebookAI/xlm-roberta-large-finetuned-conll03-english"},{description:"A token classification model specialized on medical entity recognition.",id:"blaze999/Medical-NER"},{description:"Flair models are typically the state of the art in named entity recognition tasks.",id:"flair/ner-english"}],spaces:[{description:"An application that can recognizes entities, extracts noun chunks and recognizes various linguistic features of each token.",id:"spacy/gradio_pipeline_visualizer"}],summary:"Token classification is a natural language understanding task in which a label is assigned to some tokens in a text. Some popular token classification subtasks are Named Entity Recognition (NER) and Part-of-Speech (PoS) tagging. NER models could be trained to identify specific entities in a text, such as dates, individuals and places; and PoS tagging would identify, for example, which words in a text are verbs, nouns, and punctuation marks.",widgetModels:["FacebookAI/xlm-roberta-large-finetuned-conll03-english"],youtubeId:"wVHdVlPScxA"},on=ud;var fd={canonicalId:"text-generation",datasets:[{description:"A dataset of copyright-free books translated into 16 different languages.",id:"Helsinki-NLP/opus_books"},{description:"An example of translation between programming languages. This dataset consists of functions in Java and C#.",id:"google/code_x_glue_cc_code_to_code_trans"}],demo:{inputs:[{label:"Input",content:"My name is Omar and I live in Z\xFCrich.",type:"text"}],outputs:[{label:"Output",content:"Mein Name ist Omar und ich wohne in Z\xFCrich.",type:"text"}]},metrics:[{description:"BLEU score is calculated by counting the number of shared single or subsequent tokens between the generated sequence and the reference. Subsequent n tokens are called \u201Cn-grams\u201D. Unigram refers to a single token while bi-gram refers to token pairs and n-grams refer to n subsequent tokens. The score ranges from 0 to 1, where 1 means the translation perfectly matched and 0 did not match at all",id:"bleu"},{description:"",id:"sacrebleu"}],models:[{description:"Very powerful model that can translate many languages between each other, especially low-resource languages.",id:"facebook/nllb-200-1.3B"},{description:"A general-purpose Transformer that can be used to translate from English to German, French, or Romanian.",id:"google-t5/t5-base"}],spaces:[{description:"An application that can translate between 100 languages.",id:"Iker/Translate-100-languages"},{description:"An application that can translate between many languages.",id:"Geonmo/nllb-translation-demo"}],summary:"Translation is the task of converting text from one language to another.",widgetModels:["facebook/mbart-large-50-many-to-many-mmt"],youtubeId:"1JvfrvZgi6c"},rn=fd;var gd={datasets:[{description:"A widely used dataset used to benchmark multiple variants of text classification.",id:"nyu-mll/glue"},{description:"A text classification dataset used to benchmark natural language inference models",id:"stanfordnlp/snli"}],demo:{inputs:[{label:"Input",content:"I love Hugging Face!",type:"text"}],outputs:[{type:"chart",data:[{label:"POSITIVE",score:.9},{label:"NEUTRAL",score:.1},{label:"NEGATIVE",score:0}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"The F1 metric is the harmonic mean of the precision and recall. It can be calculated as: F1 = 2 * (precision * recall) / (precision + recall)",id:"f1"}],models:[{description:"A robust model trained for sentiment analysis.",id:"distilbert/distilbert-base-uncased-finetuned-sst-2-english"},{description:"A sentiment analysis model specialized in financial sentiment.",id:"ProsusAI/finbert"},{description:"A sentiment analysis model specialized in analyzing tweets.",id:"cardiffnlp/twitter-roberta-base-sentiment-latest"},{description:"A model that can classify languages.",id:"papluca/xlm-roberta-base-language-detection"},{description:"A model that can classify text generation attacks.",id:"meta-llama/Prompt-Guard-86M"}],spaces:[{description:"An application that can classify financial sentiment.",id:"IoannisTr/Tech_Stocks_Trading_Assistant"},{description:"A dashboard that contains various text classification tasks.",id:"miesnerjacob/Multi-task-NLP"},{description:"An application that analyzes user reviews in healthcare.",id:"spacy/healthsea-demo"}],summary:"Text Classification is the task of assigning a label or class to a given text. Some use cases are sentiment analysis, natural language inference, and assessing grammatical correctness.",widgetModels:["distilbert/distilbert-base-uncased-finetuned-sst-2-english"],youtubeId:"leNG9fN9FQU"},an=gd;var hd={datasets:[{description:"Multilingual dataset used to evaluate text generation models.",id:"CohereForAI/Global-MMLU"},{description:"High quality multilingual data used to train text-generation models.",id:"HuggingFaceFW/fineweb-2"},{description:"Truly open-source, curated and cleaned dialogue dataset.",id:"HuggingFaceH4/ultrachat_200k"},{description:"A reasoning dataset.",id:"open-r1/OpenThoughts-114k-math"},{description:"A multilingual instruction dataset with preference ratings on responses.",id:"allenai/tulu-3-sft-mixture"},{description:"A large synthetic dataset for alignment of text generation models.",id:"HuggingFaceTB/smoltalk"},{description:"A dataset made for training text generation models solving math questions.",id:"HuggingFaceTB/finemath"}],demo:{inputs:[{label:"Input",content:"Once upon a time,",type:"text"}],outputs:[{label:"Output",content:"Once upon a time, we knew that our ancestors were on the verge of extinction. The great explorers and poets of the Old World, from Alexander the Great to Chaucer, are dead and gone. A good many of our ancient explorers and poets have",type:"text"}]},metrics:[{description:"Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",id:"Cross Entropy"},{description:"The Perplexity metric is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",id:"Perplexity"}],models:[{description:"A text-generation model trained to follow instructions.",id:"google/gemma-2-2b-it"},{description:"Powerful text generation model for coding.",id:"Qwen/Qwen3-Coder-480B-A35B-Instruct"},{description:"Great text generation model with top-notch tool calling capabilities.",id:"openai/gpt-oss-120b"},{description:"Powerful text generation model.",id:"zai-org/GLM-4.5"},{description:"A powerful small model with reasoning capabilities.",id:"Qwen/Qwen3-4B-Thinking-2507"},{description:"Strong conversational model that supports very long instructions.",id:"Qwen/Qwen2.5-7B-Instruct-1M"},{description:"Text generation model used to write code.",id:"Qwen/Qwen2.5-Coder-32B-Instruct"},{description:"Powerful reasoning based open large language model.",id:"deepseek-ai/DeepSeek-R1"}],spaces:[{description:"An application that writes and executes code from text instructions and supports many models.",id:"akhaliq/anycoder"},{description:"An application that builds websites from natural language prompts.",id:"enzostvs/deepsite"},{description:"A leaderboard for comparing chain-of-thought performance of models.",id:"logikon/open_cot_leaderboard"},{description:"An text generation based application based on a very powerful LLaMA2 model.",id:"ysharma/Explore_llamav2_with_TGI"},{description:"An text generation based application to converse with Zephyr model.",id:"HuggingFaceH4/zephyr-chat"},{description:"A leaderboard that ranks text generation models based on blind votes from people.",id:"lmsys/chatbot-arena-leaderboard"},{description:"An chatbot to converse with a very powerful text generation model.",id:"mlabonne/phixtral-chat"}],summary:"Generating text is the task of generating new text given another text. These models can, for example, fill in incomplete text or paraphrase.",widgetModels:["mistralai/Mistral-Nemo-Instruct-2407"],youtubeId:"e9gNEAlsOvU"},nn=hd;var yd={datasets:[{description:"Bing queries with relevant passages from various web sources.",id:"microsoft/ms_marco"}],demo:{inputs:[{label:"Source sentence",content:"Machine learning is so easy.",type:"text"},{label:"Sentences to compare to",content:"Deep learning is so straightforward.",type:"text"},{label:"",content:"This is so difficult, like rocket science.",type:"text"},{label:"",content:"I can't believe how much I struggled with this.",type:"text"}],outputs:[{type:"chart",data:[{label:"Deep learning is so straightforward.",score:2.2006407},{label:"This is so difficult, like rocket science.",score:-6.2634873},{label:"I can't believe how much I struggled with this.",score:-10.251488}]}]},metrics:[{description:"Discounted Cumulative Gain (DCG) measures the gain, or usefulness, of search results discounted by their position. The normalization is done by dividing the DCG by the ideal DCG, which is the DCG of the perfect ranking.",id:"Normalized Discounted Cumulative Gain"},{description:"Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",id:"Mean Reciprocal Rank"},{description:"Mean Average Precision (mAP) is the overall average of the Average Precision (AP) values, where AP is the Area Under the PR Curve (AUC-PR)",id:"Mean Average Precision"}],models:[{description:"An extremely efficient text ranking model trained on a web search dataset.",id:"cross-encoder/ms-marco-MiniLM-L6-v2"},{description:"A strong multilingual text reranker model.",id:"Alibaba-NLP/gte-multilingual-reranker-base"},{description:"An efficient text ranking model that punches above its weight.",id:"Alibaba-NLP/gte-reranker-modernbert-base"}],spaces:[],summary:"Text Ranking is the task of ranking a set of texts based on their relevance to a query. Text ranking models are trained on large datasets of queries and relevant documents to learn how to rank documents based on their relevance to the query. This task is particularly useful for search engines and information retrieval systems.",widgetModels:["cross-encoder/ms-marco-MiniLM-L6-v2"],youtubeId:""},sn=yd;var bd={datasets:[{description:"Microsoft Research Video to Text is a large-scale dataset for open domain video captioning",id:"iejMac/CLIP-MSR-VTT"},{description:"UCF101 Human Actions dataset consists of 13,320 video clips from YouTube, with 101 classes.",id:"quchenyuan/UCF101-ZIP"},{description:"A high-quality dataset for human action recognition in YouTube videos.",id:"nateraw/kinetics"},{description:"A dataset of video clips of humans performing pre-defined basic actions with everyday objects.",id:"HuggingFaceM4/something_something_v2"},{description:"This dataset consists of text-video pairs and contains noisy samples with irrelevant video descriptions",id:"HuggingFaceM4/webvid"},{description:"A dataset of short Flickr videos for the temporal localization of events with descriptions.",id:"iejMac/CLIP-DiDeMo"}],demo:{inputs:[{label:"Input",content:"Darth Vader is surfing on the waves.",type:"text"}],outputs:[{filename:"text-to-video-output.gif",type:"img"}]},metrics:[{description:"Inception Score uses an image classification model that predicts class labels and evaluates how distinct and diverse the images are. A higher score indicates better video generation.",id:"is"},{description:"Frechet Inception Distance uses an image classification model to obtain image embeddings. The metric compares mean and standard deviation of the embeddings of real and generated images. A smaller score indicates better video generation.",id:"fid"},{description:"Frechet Video Distance uses a model that captures coherence for changes in frames and the quality of each frame. A smaller score indicates better video generation.",id:"fvd"},{description:"CLIPSIM measures similarity between video frames and text using an image-text similarity model. A higher score indicates better video generation.",id:"clipsim"}],models:[{description:"A strong model for consistent video generation.",id:"tencent/HunyuanVideo"},{description:"A text-to-video model with high fidelity motion and strong prompt adherence.",id:"Lightricks/LTX-Video"},{description:"A text-to-video model focusing on physics-aware applications like robotics.",id:"nvidia/Cosmos-1.0-Diffusion-7B-Text2World"},{description:"Very fast model for video generation.",id:"Lightricks/LTX-Video-0.9.8-13B-distilled"}],spaces:[{description:"An application that generates video from text.",id:"VideoCrafter/VideoCrafter"},{description:"Consistent video generation application.",id:"Wan-AI/Wan2.1"},{description:"A cutting edge video generation application.",id:"Pyramid-Flow/pyramid-flow"}],summary:"Text-to-video models can be used in any application that requires generating consistent sequence of images from text. ",widgetModels:["Wan-AI/Wan2.2-TI2V-5B"],youtubeId:void 0},ln=bd;var wd={datasets:[{description:"The CIFAR-100 dataset consists of 60000 32x32 colour images in 100 classes, with 600 images per class.",id:"cifar100"},{description:"Multiple images of celebrities, used for facial expression translation.",id:"CelebA"}],demo:{inputs:[{label:"Seed",content:"42",type:"text"},{label:"Number of images to generate:",content:"4",type:"text"}],outputs:[{filename:"unconditional-image-generation-output.jpeg",type:"img"}]},metrics:[{description:"The inception score (IS) evaluates the quality of generated images. It measures the diversity of the generated images (the model predictions are evenly distributed across all possible labels) and their 'distinction' or 'sharpness' (the model confidently predicts a single label for each image).",id:"Inception score (IS)"},{description:"The Fr\xE9chet Inception Distance (FID) evaluates the quality of images created by a generative model by calculating the distance between feature vectors for real and generated images.",id:"Fre\u0107het Inception Distance (FID)"}],models:[{description:"High-quality image generation model trained on the CIFAR-10 dataset. It synthesizes images of the ten classes presented in the dataset using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",id:"google/ddpm-cifar10-32"},{description:"High-quality image generation model trained on the 256x256 CelebA-HQ dataset. It synthesizes images of faces using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",id:"google/ddpm-celebahq-256"}],spaces:[{description:"An application that can generate realistic faces.",id:"CompVis/celeba-latent-diffusion"}],summary:"Unconditional image generation is the task of generating images with no condition in any context (like a prompt text or another image). Once trained, the model will create images that resemble its training data distribution.",widgetModels:[""],youtubeId:""},pn=wd;var _d={datasets:[{description:"Benchmark dataset used for video classification with videos that belong to 400 classes.",id:"kinetics400"}],demo:{inputs:[{filename:"video-classification-input.gif",type:"img"}],outputs:[{type:"chart",data:[{label:"Playing Guitar",score:.514},{label:"Playing Tennis",score:.193},{label:"Cooking",score:.068}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"Strong Video Classification model trained on the Kinetics 400 dataset.",id:"google/vivit-b-16x2-kinetics400"},{description:"Strong Video Classification model trained on the Kinetics 400 dataset.",id:"microsoft/xclip-base-patch32"}],spaces:[{description:"An application that classifies video at different timestamps.",id:"nateraw/lavila"},{description:"An application that classifies video.",id:"fcakyon/video-classification"}],summary:"Video classification is the task of assigning a label or class to an entire video. Videos are expected to have only one class for each video. Video classification models take a video as input and return a prediction about which class the video belongs to.",widgetModels:[],youtubeId:""},cn=_d;var vd={datasets:[{description:"A large dataset used to train visual document retrieval models.",id:"vidore/colpali_train_set"}],demo:{inputs:[{filename:"input.png",type:"img"},{label:"Question",content:"Is the model in this paper the fastest for inference?",type:"text"}],outputs:[{type:"chart",data:[{label:"Page 10",score:.7},{label:"Page 11",score:.06},{label:"Page 9",score:.003}]}]},isPlaceholder:!1,metrics:[{description:"NDCG@k scores ranked recommendation lists for top-k results. 0 is the worst, 1 is the best.",id:"Normalized Discounted Cumulative Gain at K"}],models:[{description:"Very accurate visual document retrieval model for multilingual queries and documents.",id:"vidore/colqwen2-v1.0"},{description:"Very fast and efficient visual document retrieval model that can also take in other modalities like audio.",id:"Tevatron/OmniEmbed-v0.1"}],spaces:[{description:"A leaderboard of visual document retrieval models.",id:"vidore/vidore-leaderboard"},{description:"Visual retrieval augmented generation demo based on ColQwen2 model.",id:"vidore/visual-rag-tool"}],summary:"Visual document retrieval is the task of searching for relevant image-based documents, such as PDFs. These models take a text query and multiple documents as input and return the top-most relevant documents and relevancy scores as output.",widgetModels:[""],youtubeId:""},dn=vd;var xd={datasets:[{description:"A widely used dataset containing questions (with answers) about images.",id:"Graphcore/vqa"},{description:"A dataset to benchmark visual reasoning based on text in images.",id:"facebook/textvqa"}],demo:{inputs:[{filename:"elephant.jpeg",type:"img"},{label:"Question",content:"What is in this image?",type:"text"}],outputs:[{type:"chart",data:[{label:"elephant",score:.97},{label:"elephants",score:.06},{label:"animal",score:.003}]}]},isPlaceholder:!1,metrics:[{description:"",id:"accuracy"},{description:"Measures how much a predicted answer differs from the ground truth based on the difference in their semantic meaning.",id:"wu-palmer similarity"}],models:[{description:"A visual question answering model trained to convert charts and plots to text.",id:"google/deplot"},{description:"A visual question answering model trained for mathematical reasoning and chart derendering from images.",id:"google/matcha-base"},{description:"A strong visual question answering that answers questions from book covers.",id:"google/pix2struct-ocrvqa-large"}],spaces:[{description:"An application that compares visual question answering models across different tasks.",id:"merve/pix2struct"},{description:"An application that can answer questions based on images.",id:"nielsr/vilt-vqa"},{description:"An application that can caption images and answer questions about a given image. ",id:"Salesforce/BLIP"},{description:"An application that can caption images and answer questions about a given image. ",id:"vumichien/Img2Prompt"}],summary:"Visual Question Answering is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.",widgetModels:["dandelin/vilt-b32-finetuned-vqa"],youtubeId:""},mn=xd;var Ad={datasets:[{description:"A widely used dataset used to benchmark multiple variants of text classification.",id:"nyu-mll/glue"},{description:"The Multi-Genre Natural Language Inference (MultiNLI) corpus is a crowd-sourced collection of 433k sentence pairs annotated with textual entailment information.",id:"nyu-mll/multi_nli"},{description:"FEVER is a publicly available dataset for fact extraction and verification against textual sources.",id:"fever/fever"}],demo:{inputs:[{label:"Text Input",content:"Dune is the best movie ever.",type:"text"},{label:"Candidate Labels",content:"CINEMA, ART, MUSIC",type:"text"}],outputs:[{type:"chart",data:[{label:"CINEMA",score:.9},{label:"ART",score:.1},{label:"MUSIC",score:0}]}]},metrics:[],models:[{description:"Powerful zero-shot text classification model.",id:"facebook/bart-large-mnli"},{description:"Cutting-edge zero-shot multilingual text classification model.",id:"MoritzLaurer/ModernBERT-large-zeroshot-v2.0"},{description:"Zero-shot text classification model that can be used for topic and sentiment classification.",id:"knowledgator/gliclass-modern-base-v2.0-init"}],spaces:[],summary:"Zero-shot text classification is a task in natural language processing where a model is trained on a set of labeled examples but is then able to classify new examples from previously unseen classes.",widgetModels:["facebook/bart-large-mnli"]},un=Ad;var kd={datasets:[{description:"",id:""}],demo:{inputs:[{filename:"image-classification-input.jpeg",type:"img"},{label:"Classes",content:"cat, dog, bird",type:"text"}],outputs:[{type:"chart",data:[{label:"Cat",score:.664},{label:"Dog",score:.329},{label:"Bird",score:.008}]}]},metrics:[{description:"Computes the number of times the correct label appears in top K labels predicted",id:"top-K accuracy"}],models:[{description:"Multilingual image classification model for 80 languages.",id:"visheratin/mexma-siglip"},{description:"Strong zero-shot image classification model.",id:"google/siglip2-base-patch16-224"},{description:"Robust zero-shot image classification model.",id:"intfloat/mmE5-mllama-11b-instruct"},{description:"Powerful zero-shot image classification model supporting 94 languages.",id:"jinaai/jina-clip-v2"},{description:"Strong image classification model for biomedical domain.",id:"microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224"}],spaces:[{description:"An application that leverages zero-shot image classification to find best captions to generate an image. ",id:"pharma/CLIP-Interrogator"},{description:"An application to compare different zero-shot image classification models. ",id:"merve/compare_clip_siglip"}],summary:"Zero-shot image classification is the task of classifying previously unseen classes during training of a model.",widgetModels:["google/siglip-so400m-patch14-224"],youtubeId:""},fn=kd;var Id={datasets:[],demo:{inputs:[{filename:"zero-shot-object-detection-input.jpg",type:"img"},{label:"Classes",content:"cat, dog, bird",type:"text"}],outputs:[{filename:"zero-shot-object-detection-output.jpg",type:"img"}]},metrics:[{description:"The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",id:"Average Precision"},{description:"The Mean Average Precision (mAP) metric is the overall average of the AP values",id:"Mean Average Precision"},{description:"The AP\u03B1 metric is the Average Precision at the IoU threshold of a \u03B1 value, for example, AP50 and AP75",id:"AP\u03B1"}],models:[{description:"Solid zero-shot object detection model.",id:"openmmlab-community/mm_grounding_dino_large_all"},{description:"Cutting-edge zero-shot object detection model.",id:"fushh7/LLMDet"}],spaces:[{description:"A demo to compare different zero-shot object detection models per output and latency.",id:"ariG23498/zero-shot-od"},{description:"A demo that combines a zero-shot object detection and mask generation model for zero-shot segmentation.",id:"merve/OWLSAM"}],summary:"Zero-shot object detection is a computer vision task to detect objects and their classes in images, without any prior training or knowledge of the classes. Zero-shot object detection models receive an image as input, as well as a list of candidate classes, and output the bounding boxes and labels where the objects have been detected.",widgetModels:[],youtubeId:""},gn=Id;var Td={datasets:[{description:"A large dataset of over 10 million 3D objects.",id:"allenai/objaverse-xl"},{description:"A dataset of isolated object images for evaluating image-to-3D models.",id:"dylanebert/iso3d"}],demo:{inputs:[{filename:"image-to-3d-image-input.png",type:"img"}],outputs:[{label:"Result",content:"image-to-3d-3d-output-filename.glb",type:"text"}]},metrics:[],models:[{description:"Fast image-to-3D mesh model by Tencent.",id:"TencentARC/InstantMesh"},{description:"3D world generation model.",id:"tencent/HunyuanWorld-1"},{description:"A scaled up image-to-3D mesh model derived from TripoSR.",id:"hwjiang/Real3D"},{description:"Consistent image-to-3d generation model.",id:"stabilityai/stable-point-aware-3d"}],spaces:[{description:"Leaderboard to evaluate image-to-3D models.",id:"dylanebert/3d-arena"},{description:"Image-to-3D demo with mesh outputs.",id:"TencentARC/InstantMesh"},{description:"Image-to-3D demo.",id:"stabilityai/stable-point-aware-3d"},{description:"Image-to-3D demo with mesh outputs.",id:"hwjiang/Real3D"},{description:"Image-to-3D demo with splat outputs.",id:"dylanebert/LGM-mini"}],summary:"Image-to-3D models take in image input and produce 3D output.",widgetModels:[],youtubeId:""},hn=Td;var Sd={datasets:[{description:"A large dataset of over 10 million 3D objects.",id:"allenai/objaverse-xl"},{description:"Descriptive captions for 3D objects in Objaverse.",id:"tiange/Cap3D"}],demo:{inputs:[{label:"Prompt",content:"a cat statue",type:"text"}],outputs:[{label:"Result",content:"text-to-3d-3d-output-filename.glb",type:"text"}]},metrics:[],models:[{description:"Text-to-3D mesh model by OpenAI",id:"openai/shap-e"},{description:"Generative 3D gaussian splatting model.",id:"ashawkey/LGM"}],spaces:[{description:"Text-to-3D demo with mesh outputs.",id:"hysts/Shap-E"},{description:"Text/image-to-3D demo with splat outputs.",id:"ashawkey/LGM"}],summary:"Text-to-3D models take in text input and produce 3D output.",widgetModels:[],youtubeId:""},yn=Sd;var Rd={datasets:[{description:"A dataset of hand keypoints of over 500k examples.",id:"Vincent-luo/hagrid-mediapipe-hands"}],demo:{inputs:[{filename:"keypoint-detection-input.png",type:"img"}],outputs:[{filename:"keypoint-detection-output.png",type:"img"}]},metrics:[],models:[{description:"A robust keypoint detection model.",id:"magic-leap-community/superpoint"},{description:"A robust keypoint matching model.",id:"magic-leap-community/superglue_outdoor"},{description:"Strong keypoint detection model used to detect human pose.",id:"qualcomm/RTMPose-Body2d"},{description:"Powerful keypoint matching model.",id:"ETH-CVG/lightglue_disk"}],spaces:[{description:"An application that detects hand keypoints in real-time.",id:"datasciencedojo/Hand-Keypoint-Detection-Realtime"},{description:"An application for keypoint detection and matching.",id:"ETH-CVG/LightGlue"}],summary:"Keypoint detection is the task of identifying meaningful distinctive points or features in an image.",widgetModels:[],youtubeId:""},bn=Rd;var Ed={datasets:[{description:"Multiple-choice questions and answers about videos.",id:"lmms-lab/Video-MME"},{description:"A dataset of instructions and question-answer pairs about videos.",id:"lmms-lab/VideoChatGPT"},{description:"Large video understanding dataset.",id:"HuggingFaceFV/finevideo"}],demo:{inputs:[{filename:"video-text-to-text-input.gif",type:"img"},{label:"Text Prompt",content:"What is happening in this video?",type:"text"}],outputs:[{label:"Answer",content:"The video shows a series of images showing a fountain with water jets and a variety of colorful flowers and butterflies in the background.",type:"text"}]},metrics:[],models:[{description:"A robust video-text-to-text model.",id:"Vision-CAIR/LongVU_Qwen2_7B"},{description:"Strong video-text-to-text model with reasoning capabilities.",id:"GoodiesHere/Apollo-LMMs-Apollo-7B-t32"},{description:"Strong video-text-to-text model.",id:"HuggingFaceTB/SmolVLM2-2.2B-Instruct"}],spaces:[{description:"An application to chat with a video-text-to-text model.",id:"llava-hf/video-llava"},{description:"A leaderboard for various video-text-to-text models.",id:"opencompass/openvlm_video_leaderboard"},{description:"An application to generate highlights from a video.",id:"HuggingFaceTB/SmolVLM2-HighlightGenerator"}],summary:"Video-text-to-text models take in a video and a text prompt and output text. These models are also called video-language models.",widgetModels:[""],youtubeId:""},wn=Ed;var Pd={datasets:[{description:"Dataset with detailed annotations for training and benchmarking video instance editing.",id:"suimu/VIRESET"},{description:"Dataset to evaluate models on long video generation and understanding.",id:"zhangsh2001/LongV-EVAL"},{description:"Collection of 104 demo videos from the SeedVR/SeedVR2 series showcasing model outputs.",id:"Iceclear/SeedVR_VideoDemos"}],demo:{inputs:[{filename:"input.gif",type:"img"}],outputs:[{filename:"output.gif",type:"img"}]},metrics:[],models:[{description:"Model for editing outfits, character, and scenery in videos.",id:"decart-ai/Lucy-Edit-Dev"},{description:"Framework that uses 3D mesh proxies for precise, consistent video editing.",id:"LeoLau/Shape-for-Motion"},{description:"Model for generating physics-aware videos from input videos and control conditions.",id:"nvidia/Cosmos-Transfer2.5-2B"},{description:"A model to upscale videos at input, designed for seamless use with ComfyUI.",id:"numz/SeedVR2_comfyUI"}],spaces:[{description:"Interactive demo space for Lucy-Edit-Dev video editing.",id:"decart-ai/lucy-edit-dev"},{description:"Demo space for SeedVR2-3B showcasing video upscaling and restoration.",id:"ByteDance-Seed/SeedVR2-3B"}],summary:"Video-to-video models take one or more videos as input and generate new videos as output. They can enhance quality, interpolate frames, modify styles, or create new motion dynamics, enabling creative applications, video production, and research.",widgetModels:[],youtubeId:""},_n=Pd;var Cd={"audio-classification":["speechbrain","transformers","transformers.js"],"audio-to-audio":["asteroid","fairseq","speechbrain"],"automatic-speech-recognition":["espnet","nemo","speechbrain","transformers","transformers.js"],"audio-text-to-text":["transformers"],"depth-estimation":["transformers","transformers.js"],"document-question-answering":["transformers","transformers.js"],"feature-extraction":["sentence-transformers","transformers","transformers.js"],"fill-mask":["transformers","transformers.js"],"graph-ml":["transformers"],"image-classification":["keras","timm","transformers","transformers.js"],"image-feature-extraction":["timm","transformers"],"image-segmentation":["transformers","transformers.js"],"image-text-to-text":["transformers"],"image-text-to-image":["diffusers"],"image-text-to-video":["diffusers"],"image-to-image":["diffusers","transformers","transformers.js"],"image-to-text":["transformers","transformers.js"],"image-to-video":["diffusers"],"keypoint-detection":["transformers"],"video-classification":["transformers"],"mask-generation":["transformers"],"multiple-choice":["transformers"],"object-detection":["transformers","transformers.js","ultralytics"],other:[],"question-answering":["adapter-transformers","allennlp","transformers","transformers.js"],robotics:[],"reinforcement-learning":["transformers","stable-baselines3","ml-agents","sample-factory"],"sentence-similarity":["sentence-transformers","spacy","transformers.js"],summarization:["transformers","transformers.js"],"table-question-answering":["transformers"],"table-to-text":["transformers"],"tabular-classification":["sklearn"],"tabular-regression":["sklearn"],"tabular-to-text":["transformers"],"text-classification":["adapter-transformers","setfit","spacy","transformers","transformers.js"],"text-generation":["transformers","transformers.js"],"text-ranking":["sentence-transformers","transformers"],"text-retrieval":[],"text-to-image":["diffusers"],"text-to-speech":["espnet","tensorflowtts","transformers","transformers.js"],"text-to-audio":["transformers","transformers.js"],"text-to-video":["diffusers"],"time-series-forecasting":[],"token-classification":["adapter-transformers","flair","spacy","span-marker","stanza","transformers","transformers.js"],translation:["transformers","transformers.js"],"unconditional-image-generation":["diffusers"],"video-text-to-text":["transformers"],"visual-question-answering":["transformers","transformers.js"],"voice-activity-detection":[],"zero-shot-classification":["transformers","transformers.js"],"zero-shot-image-classification":["transformers","transformers.js"],"zero-shot-object-detection":["transformers","transformers.js"],"text-to-3d":["diffusers"],"image-to-3d":["diffusers"],"any-to-any":["transformers"],"visual-document-retrieval":["transformers"],"video-to-video":["diffusers"]};function R(e,t=Ya){return{...t,id:e,label:rt[e].name,libraries:Cd[e]}}var kx={"any-to-any":R("any-to-any",Ta),"audio-classification":R("audio-classification",Sa),"audio-to-audio":R("audio-to-audio",Ea),"audio-text-to-text":R("audio-text-to-text",Ra),"automatic-speech-recognition":R("automatic-speech-recognition",Pa),"depth-estimation":R("depth-estimation",Xa),"document-question-answering":R("document-question-answering",Ca),"visual-document-retrieval":R("visual-document-retrieval",dn),"feature-extraction":R("feature-extraction",La),"fill-mask":R("fill-mask",Ua),"graph-ml":void 0,"image-classification":R("image-classification",Ma),"image-feature-extraction":R("image-feature-extraction",Oa),"image-segmentation":R("image-segmentation",Ba),"image-to-image":R("image-to-image",Da),"image-text-to-text":R("image-text-to-text",$a),"image-text-to-image":R("image-text-to-image",ja),"image-text-to-video":R("image-text-to-video",qa),"image-to-text":R("image-to-text",Na),"image-to-video":R("image-to-video",Fa),"keypoint-detection":R("keypoint-detection",bn),"mask-generation":R("mask-generation",Va),"multiple-choice":void 0,"object-detection":R("object-detection",Ha),"video-classification":R("video-classification",cn),other:void 0,"question-answering":R("question-answering",Wa),"reinforcement-learning":R("reinforcement-learning",za),robotics:void 0,"sentence-similarity":R("sentence-similarity",Ka),summarization:R("summarization",Qa),"table-question-answering":R("table-question-answering",Ja),"table-to-text":void 0,"tabular-classification":R("tabular-classification",Ga),"tabular-regression":R("tabular-regression",Za),"tabular-to-text":void 0,"text-classification":R("text-classification",an),"text-generation":R("text-generation",nn),"text-ranking":R("text-ranking",sn),"text-retrieval":void 0,"text-to-image":R("text-to-image",en),"text-to-speech":R("text-to-speech",tn),"text-to-audio":void 0,"text-to-video":R("text-to-video",ln),"time-series-forecasting":void 0,"token-classification":R("token-classification",on),translation:R("translation",rn),"unconditional-image-generation":R("unconditional-image-generation",pn),"video-text-to-text":R("video-text-to-text",wn),"video-to-video":R("video-to-video",_n),"visual-question-answering":R("visual-question-answering",mn),"voice-activity-detection":void 0,"zero-shot-classification":R("zero-shot-classification",un),"zero-shot-image-classification":R("zero-shot-image-classification",fn),"zero-shot-object-detection":R("zero-shot-object-detection",gn),"text-to-3d":R("text-to-3d",yn),"image-to-3d":R("image-to-3d",hn)};var Ld=()=>'"Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!"',Ud=()=>'"\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 \u0412\u043E\u043B\u044C\u0444\u0433\u0430\u043D\u0433 \u0438 \u044F \u0436\u0438\u0432\u0443 \u0432 \u0411\u0435\u0440\u043B\u0438\u043D\u0435"',Md=()=>'"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."',Od=()=>`{
    "query": "How many stars does the transformers repository have?",
    "table": {
        "Repository": ["Transformers", "Datasets", "Tokenizers"],
        "Stars": ["36542", "4512", "3934"],
        "Contributors": ["651", "77", "34"],
        "Programming language": [
            "Python",
            "Python",
            "Rust, Python and NodeJS"
        ]
    }
}`,Dd=()=>`{
        "image": "cat.png",
        "question": "What is in this image?"
    }`,Nd=()=>`{
    "question": "What is my name?",
    "context": "My name is Clara and I live in Berkeley."
}`,$d=()=>'"I like you. I love you"',jd=()=>'"My name is Sarah Jessica Parker but you can call me Jessica"',vn=e=>e.pipeline_tag==="text-generation"?[{role:"user",content:"What is the capital of France?"}]:[{role:"user",content:[{type:"text",text:"Describe this image in one sentence."},{type:"image_url",image_url:{url:"https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"}}]}],qd=e=>JSON.stringify(`The answer to the universe is ${e.mask_token}.`),Bd=()=>`{
    "query": "Which planet is known as the Red Planet?",
    "texts": [
        "Venus is often called Earth's twin because of its similar size and proximity.",
        "Mars, known for its reddish appearance, is often referred to as the Red Planet.",
        "Jupiter, the largest planet in our solar system, has a prominent red spot.",
        "Saturn, famous for its rings, is sometimes mistaken for the Red Planet."
    ]
}`,Fd=()=>`{
    "source_sentence": "That is a happy person",
    "sentences": [
        "That is a happy dog",
        "That is a very happy person",
        "Today is a sunny day"
    ]
}`,Vd=()=>'"Today is a sunny day and I will get some ice cream."',Hd=()=>'"cats.jpg"',Xd=()=>'"cats.jpg"',Yd=()=>`{
    "image": "cat.png",
    "prompt": "Turn the cat into a tiger."
}`,zd=()=>`{
    "image": "cat.png",
    "prompt": "The cat starts to dance"
}`,Wd=()=>`{
    "image": "cat.png",
    "prompt": "Turn the cat into a tiger."
}`,Kd=()=>`{
    "image": "cat.png",
    "prompt": "The cat starts to dance"
}`,Qd=()=>'"cats.jpg"',Jd=()=>'"cats.jpg"',Gd=()=>'"sample1.flac"',Zd=()=>'"sample1.flac"',em=()=>'"Astronaut riding a horse"',tm=()=>'"A young man walking on the street"',om=()=>'"The answer to the universe is 42"',rm=()=>'"liquid drum and bass, atmospheric synths, airy sounds"',am=()=>'"sample1.flac"',xn=()=>`'{"Height":[11.52,12.48],"Length1":[23.2,24.0],"Length2":[25.4,26.3],"Species": ["Bream","Bream"]}'`,nm=()=>'"cats.jpg"',im={"audio-to-audio":Gd,"audio-classification":Zd,"automatic-speech-recognition":am,"document-question-answering":Dd,"feature-extraction":Vd,"fill-mask":qd,"image-classification":Hd,"image-to-text":Xd,"image-to-image":Yd,"image-to-video":zd,"image-text-to-image":Wd,"image-text-to-video":Kd,"image-segmentation":Qd,"object-detection":Jd,"question-answering":Nd,"sentence-similarity":Fd,"text-ranking":Bd,summarization:Md,"table-question-answering":Od,"tabular-regression":xn,"tabular-classification":xn,"text-classification":$d,"text-generation":vn,"image-text-to-text":vn,"text-to-image":em,"text-to-video":tm,"text-to-speech":om,"text-to-audio":rm,"token-classification":jd,translation:Ud,"zero-shot-classification":Ld,"zero-shot-image-classification":nm};function fe(e,t=!1,o=!1){if(e.pipeline_tag){let r=im[e.pipeline_tag];if(r){let a=r(e);if(typeof a=="string"&&(t&&(a=a.replace(/(?:(?:\r?\n|\r)\t*)|\t+/g," ")),o)){let n=/^"(.+)"$/s,i=a.match(n);a=i?i[1]:a}return a}}return"No input example has been defined for this model task."}function Zo(e,t){let o=JSON.stringify(e,null,"	");return t?.indent&&(o=o.replaceAll(`
`,`
${t.indent}`)),t?.attributeKeyQuotes||(o=o.replace(/"([^"]+)":/g,"$1:")),t?.customContentEscaper&&(o=t.customContentEscaper(o)),o}var Rn="custom_code";function ae(e){let t=e.split("/");return t.length===1?t[0]:t[1]}var Ie=e=>JSON.stringify(e).slice(1,-1),br=e=>/^[A-Za-z_]\w*$/.test(e),En=e=>[`# Install from https://github.com/manasdutta04/aadya (train extras: torch)
from huggingface_hub import snapshot_download
from aadya_neural.torch_forecaster import AadyaM1Forecaster

weights = snapshot_download("${e.id}")
model = AadyaM1Forecaster(weights)
pmf = model.forecast([28, 30, 27], elapsed=0)`],Pn=e=>[`from adapters import AutoAdapterModel

model = AutoAdapterModel.from_pretrained("${Ie(e.config?.adapter_transformers?.model_name??"<base-model-id>")}")
model.load_adapter("${e.id}", set_active=True)`],sm=e=>[`import allennlp_models
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path("hf://${e.id}")`],lm=e=>[`import allennlp_models
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path("hf://${e.id}")
predictor_input = {"passage": "My name is Wolfgang and I live in Berlin", "question": "Where do I live?"}
predictions = predictor.predict_json(predictor_input)`],Cn=e=>e.tags.includes("question-answering")?lm(e):sm(e),Ln=e=>[`from araclip import AraClip

model = AraClip.from_pretrained("${e.id}")`],Un=e=>[`# Run the policy in a browser simulation of the Asimov 1 humanoid (no GPU needed)
git clone https://github.com/menloresearch/humanoid-policy-viewer
cd humanoid-policy-viewer
npm install
npm run hf ${e.id}`],Mn=e=>[`from asteroid.models import BaseModel

model = BaseModel.from_pretrained("${e.id}")`],On=e=>{let t=`# Watermark Generator
from audioseal import AudioSeal

model = AudioSeal.load_generator("${e.id}")
# pass a tensor (tensor_wav) of shape (batch, channels, samples) and a sample rate
wav, sr = tensor_wav, 16000

watermark = model.get_watermark(wav, sr)
watermarked_audio = wav + watermark`,o=`# Watermark Detector
from audioseal import AudioSeal

detector = AudioSeal.load_detector("${e.id}")

result, message = detector.detect_watermark(watermarked_audio, sr)`;return[t,o]};function He(e){let t=e.cardData?.base_model,o=Array.isArray(t)?t:t?[t]:[],r=o.find(a=>a.toLowerCase().endsWith("-diffusers"))??o[0];return Ie(r??"fill-in-base-model")}function Me(e){let t=e.widgetData?.[0]?.text??e.cardData?.instance_prompt;if(t)return Ie(t)}var Dn=e=>[`import requests
from PIL import Image
from ben2 import AutoModel

url = "https://huggingface.co/datasets/mishig/sample_images/resolve/main/teapot.jpg"
image = Image.open(requests.get(url, stream=True).raw)

model = AutoModel.from_pretrained("${e.id}")
model.to("cuda").eval()
foreground = model.inference(image)
`],Nn=e=>[`from bertopic import BERTopic

model = BERTopic.load("${e.id}")`],$n=e=>[`from bm25s.hf import BM25HF

retriever = BM25HF.load_from_hub("${e.id}")`],jn=()=>[`# pip install chatterbox-tts
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS

model = ChatterboxTTS.from_pretrained(device="cuda")

text = "Ezreal and Jinx teamed up with Ahri, Yasuo, and Teemo to take down the enemy's Nexus in an epic late-game pentakill."
wav = model.generate(text)
ta.save("test-1.wav", wav, model.sr)

# If you want to synthesize with a different voice, specify the audio prompt
AUDIO_PROMPT_PATH="YOUR_FILE.wav"
wav = model.generate(text, audio_prompt_path=AUDIO_PROMPT_PATH)
ta.save("test-2.wav", wav, model.sr)`],qn=e=>{let t="pip install chronos-forecasting",o=`import pandas as pd
from chronos import BaseChronosPipeline

pipeline = BaseChronosPipeline.from_pretrained("${e.id}", device_map="cuda")

# Load historical data
context_df = pd.read_csv("https://autogluon.s3.us-west-2.amazonaws.com/datasets/timeseries/misc/AirPassengers.csv")

# Generate predictions
pred_df = pipeline.predict_df(
    context_df,
    prediction_length=36,  # Number of steps to forecast
    quantile_levels=[0.1, 0.5, 0.9],  # Quantiles for probabilistic forecast
    id_column="item_id",  # Column identifying different time series
    timestamp_column="Month",  # Column with datetime information
    target="#Passengers",  # Column(s) with time series values to predict
)`;return[t,o]},Bn=e=>["pip install git+https://github.com/HanClinto/CollectorVision huggingface_hub",`from huggingface_hub import hf_hub_download
import collector_vision as cvg

checkpoint = hf_hub_download(repo_id="${e.id}", filename="model.onnx")

# Detector models, such as Cornelius:
detector = cvg.NeuralCornerDetector(checkpoint)

# Embedder models, such as Milo:
embedder = cvg.NeuralEmbedder(checkpoint)`],Fn=()=>["pip install colipri",`from colipri import get_model
from colipri import get_processor
from colipri import load_sample_ct
from colipri import ZeroShotImageClassificationPipeline

model = get_model().cuda()
processor = get_processor()
pipeline = ZeroShotImageClassificationPipeline(model, processor)

image = load_sample_ct()

pipeline(image, ["No lung nodules", "Lung nodules"])
`],Vn=()=>["pip install git+https://github.com/SAP-samples/sap-rpt-1-oss",`# Run a classification task
from sklearn.datasets import load_breast_cancer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from sap_rpt_oss import SAP_RPT_OSS_Classifier

# Load sample data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize a classifier, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
clf = SAP_RPT_OSS_Classifier(max_context_size=8192, bagging=8)

clf.fit(X_train, y_train)

# Predict probabilities
prediction_probabilities = clf.predict_proba(X_test)
# Predict labels
predictions = clf.predict(X_test)
print("Accuracy", accuracy_score(y_test, predictions))`,`# Run a regression task
from sklearn.datasets import fetch_openml
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split

from sap_rpt_oss import SAP_RPT_OSS_Regressor

# Load sample data
df = fetch_openml(data_id=531, as_frame=True)
X = df.data
y = df.target.astype(float)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize the regressor, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
regressor = SAP_RPT_OSS_Regressor(max_context_size=8192, bagging=8)

regressor.fit(X_train, y_train)

# Predict on the test set
predictions = regressor.predict(X_test)

r2 = r2_score(y_test, predictions)
print("R\xB2 Score:", r2)`],Hn=e=>{let t=`# one Rust binary, no additional dependencies
cargo install cortiq-cli   # or a prebuilt binary from github.com/infosave2007/cmf/releases
hf download ${e.id} --include "*.cmf" --local-dir .
ls *.cmf                   # some repos ship more than one quantization`;return e.pipeline_tag==="text-to-image"?[t,'cortiq imagine FILE.cmf --prompt "a red fox in a snowy forest" --out fox.ppm']:e.pipeline_tag==="text-to-video"?[t,'cortiq animate FILE.cmf --prompt "a corgi in a chef hat flipping a pancake" --out clip.avi']:e.pipeline_tag==="text-to-audio"?[t,`cortiq music FILE.cmf --prompt "dream pop, warm analog synths, brushed drums" \\
  --lyrics "[verse] the tide came in and took the map" --seconds 20 --out song.wav`]:[t,'cortiq run FILE.cmf --prompt "What is the capital of France?"',"cortiq serve FILE.cmf --port 8080   # OpenAI-compatible server"]},Xn=()=>[`# pip install git+https://github.com/Google-Health/cxr-foundation.git#subdirectory=python

# Load image as grayscale (Stillwaterising, CC0, via Wikimedia Commons)
import requests
from PIL import Image
from io import BytesIO
image_url = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Chest_Xray_PA_3-8-2010.png"
img = Image.open(requests.get(image_url, headers={'User-Agent': 'Demo'}, stream=True).raw).convert('L')

# Run inference
from clientside.clients import make_hugging_face_client
cxr_client = make_hugging_face_client('cxr_model')
print(cxr_client.get_image_embeddings_from_images([img]))`],Yn=e=>{let t,o,r;return t="<ENCODER>",o="<NUMBER_OF_FEATURES>",r="<OUT_CHANNELS>",e.id==="depth-anything/Depth-Anything-V2-Small"?(t="vits",o="64",r="[48, 96, 192, 384]"):e.id==="depth-anything/Depth-Anything-V2-Base"?(t="vitb",o="128",r="[96, 192, 384, 768]"):e.id==="depth-anything/Depth-Anything-V2-Large"&&(t="vitl",o="256",r="[256, 512, 1024, 1024]"),[`
# Install from https://github.com/DepthAnything/Depth-Anything-V2

# Load the model and infer depth from an image
import cv2
import torch
from huggingface_hub import hf_hub_download

from depth_anything_v2.dpt import DepthAnythingV2

# instantiate the model
model = DepthAnythingV2(encoder="${t}", features=${o}, out_channels=${r})

# load the weights
filepath = hf_hub_download(repo_id="${e.id}", filename="depth_anything_v2_${t}.pth", repo_type="model")
state_dict = torch.load(filepath, map_location="cpu")
model.load_state_dict(state_dict)
model.eval()

raw_img = cv2.imread("your/image/path")
depth = model.infer_image(raw_img) # HxW raw depth map in numpy
    `]},zn=e=>[`# Download checkpoint
pip install huggingface_hub
hf download ${e.id} --local-dir checkpoints`,`import depth_pro

# Load model and preprocessing transform
model, transform = depth_pro.create_model_and_transforms()
model.eval()

# Load and preprocess an image.
image, _, f_px = depth_pro.load_rgb("example.png")
image = transform(image)

# Run inference.
prediction = model.infer(image, f_px=f_px)

# Results: 1. Depth in meters
depth = prediction["depth"]
# Results: 2. Focal length in pixels
focallength_px = prediction["focallength_px"]`],Wn=()=>[`from huggingface_hub import from_pretrained_keras
import tensorflow as tf, requests

# Load and format input
IMAGE_URL = "https://storage.googleapis.com/dx-scin-public-data/dataset/images/3445096909671059178.png"
input_tensor = tf.train.Example(
    features=tf.train.Features(
        feature={
            "image/encoded": tf.train.Feature(
                bytes_list=tf.train.BytesList(value=[requests.get(IMAGE_URL, stream=True).content])
            )
        }
    )
).SerializeToString()

# Load model and run inference
loaded_model = from_pretrained_keras("google/derm-foundation")
infer = loaded_model.signatures["serving_default"]
print(infer(inputs=tf.constant([input_tensor])))`],Kn=e=>[`import soundfile as sf
from dia.model import Dia

model = Dia.from_pretrained("${e.id}")
text = "[S1] Dia is an open weights text to dialogue model. [S2] You get full control over scripts and voices. [S1] Wow. Amazing. (laughs) [S2] Try it now on Git hub or Hugging Face."
output = model.generate(text)

sf.write("simple.mp3", output, 44100)`],Qn=e=>[`from dia2 import Dia2, GenerationConfig, SamplingConfig

dia = Dia2.from_repo("${e.id}", device="cuda", dtype="bfloat16")
config = GenerationConfig(
    cfg_scale=2.0,
    audio=SamplingConfig(temperature=0.8, top_k=50),
    use_cuda_graph=True,
)
result = dia.generate("[S1] Hello Dia2!", config=config, output_wav="hello.wav", verbose=True)
`],Jn=e=>[`# pip install git+https://github.com/NVlabs/describe-anything
from huggingface_hub import snapshot_download
from dam import DescribeAnythingModel

snapshot_download("${e.id}", local_dir="checkpoints")

dam = DescribeAnythingModel(
	model_path="checkpoints",
	conv_mode="v1",
	prompt_mode="focal_prompt",
)`],pm="pip install -U diffusers transformers accelerate",Gn="Astronaut in a jungle, cold color palette, muted colors, detailed, 8k",Zn="Turn this cat into a dog",wr="A man with short gray hair plays a red electric guitar.",cm=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")

prompt = "${Me(e)??Gn}"
image = pipe(prompt).images[0]`],dm=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")

prompt = "${Me(e)??Zn}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/cat.png")

image = pipe(image=input_image, prompt=prompt).images[0]`],mm=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image, export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")
pipe.to("cuda")

prompt = "${Me(e)??wr}"
image = load_image(
    "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/guitar-man.png"
)

output = pipe(image=image, prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],um=e=>[`from diffusers import ControlNetModel, StableDiffusionControlNetPipeline

controlnet = ControlNetModel.from_pretrained("${e.id}")
pipe = StableDiffusionControlNetPipeline.from_pretrained(
	"${He(e)}", controlnet=controlnet
)`],fm=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${He(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${Me(e)??Gn}"
image = pipe(prompt).images[0]`],gm=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${He(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${Me(e)??Zn}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/cat.png")

image = pipe(image=input_image, prompt=prompt).images[0]`],hm=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${He(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${Me(e)??wr}"

output = pipe(prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],ym=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image, export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${He(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${Me(e)??wr}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/guitar-man.png")

output = pipe(image=input_image, prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],bm=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${He(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_textual_inversion("${e.id}")`],wm=e=>[`import torch
from diffusers import FluxFillPipeline
from diffusers.utils import load_image

image = load_image("https://huggingface.co/datasets/diffusers/diffusers-images-docs/resolve/main/cup.png")
mask = load_image("https://huggingface.co/datasets/diffusers/diffusers-images-docs/resolve/main/cup_mask.png")

# switch to "mps" for apple devices
pipe = FluxFillPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")
image = pipe(
    prompt="a white paper cup",
    image=image,
    mask_image=mask,
    height=1632,
    width=1232,
    guidance_scale=30,
    num_inference_steps=50,
    max_sequence_length=512,
    generator=torch.Generator("cpu").manual_seed(0)
).images[0]
image.save(f"flux-fill-dev.png")`],_m=e=>[`import torch
from diffusers import AutoPipelineForInpainting
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = AutoPipelineForInpainting.from_pretrained("${e.id}", dtype=torch.float16, device_map="cuda")

img_url = "https://raw.githubusercontent.com/CompVis/latent-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png"
mask_url = "https://raw.githubusercontent.com/CompVis/latent-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo_mask.png"

image = load_image(img_url).resize((1024, 1024))
mask_image = load_image(mask_url).resize((1024, 1024))

prompt = "a tiger sitting on a park bench"
generator = torch.Generator(device="cuda").manual_seed(0)

image = pipe(
  prompt=prompt,
  image=image,
  mask_image=mask_image,
  guidance_scale=8.0,
  num_inference_steps=20,  # steps between 15 and 30 work well for us
  strength=0.99,  # make sure to use \`strength\` below 1.0
  generator=generator,
).images[0]`],_r=e=>{let t=r=>e.tags.includes(`diffusers:${r}`)||e.tags.includes(r)||e.config?.diffusers?._class_name===r,o;return t("StableDiffusionInpaintPipeline")||t("StableDiffusionXLInpaintPipeline")?o=_m(e):e.tags.includes("controlnet")?o=um(e):e.tags.includes("lora")?e.pipeline_tag==="image-to-image"?o=gm(e):e.pipeline_tag==="image-to-video"?o=ym(e):e.pipeline_tag==="text-to-video"?o=hm(e):o=fm(e):e.tags.includes("textual_inversion")?o=bm(e):t("FluxFillPipeline")?o=wm(e):e.pipeline_tag==="image-to-video"?o=mm(e):e.pipeline_tag==="image-to-image"?o=dm(e):o=cm(e),[pm,...o]},ei=e=>{let t=`# Pipeline for Stable Diffusion 3
from diffusionkit.mlx import DiffusionPipeline

pipeline = DiffusionPipeline(
	shift=3.0,
	use_t5=False,
	model_version="${e.id}",
	low_memory_mode=True,
	a16=True,
	w16=True,
)`,o=`# Pipeline for Flux
from diffusionkit.mlx import FluxPipeline

pipeline = FluxPipeline(
  shift=1.0,
  model_version="${e.id}",
  low_memory_mode=True,
  a16=True,
  w16=True,
)`,r=`# Image Generation
HEIGHT = 512
WIDTH = 512
NUM_STEPS = ${e.tags.includes("flux")?4:50}
CFG_WEIGHT = ${e.tags.includes("flux")?0:5}

image, _ = pipeline.generate_image(
  "a photo of a cat",
  cfg_weight=CFG_WEIGHT,
  num_steps=NUM_STEPS,
  latent_size=(HEIGHT // 8, WIDTH // 8),
)`;return[e.tags.includes("flux")?o:t,r]},ti=e=>[`# The cartesia-pytorch package on PyPI ships no code: clone the repo and put its cartesia-pytorch folder on PYTHONPATH
# (it needs an Ampere or newer CUDA GPU, torch 2.4, mamba-ssm 2.2.2 and flash-attn 2.6.3)
# git clone https://github.com/cartesia-ai/edge && export PYTHONPATH="$PWD/edge/cartesia-pytorch:$PYTHONPATH"
from cartesia_pytorch.Rene import ReneLMHeadModel
from transformers import AutoTokenizer

model = ReneLMHeadModel.from_pretrained("${e.id}").half().cuda()
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-1B-hf")

in_message = ["Rene Descartes was"]
inputs = tokenizer(in_message, return_tensors="pt")

outputs = model.generate(inputs.input_ids.cuda(), max_length=50, top_k=100, top_p=0.99)
out_message = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

print(out_message)`],oi=e=>[`import mlx.core as mx
import cartesia_mlx as cmx

model = cmx.from_pretrained("${e.id}")
model.set_dtype(mx.float32)

prompt = "Rene Descartes was"

for text in model.generate(
    prompt,
    max_tokens=500,
    eval_every_n=5,
    verbose=True,
    top_p=0.99,
    temperature=0.85,
):
    print(text, end="", flush=True)
`],ri=e=>{let t=ae(e.id).replaceAll("-","_");return[`# Load it from the Hub directly
import edsnlp
nlp = edsnlp.load("${e.id}")
`,`# Or install it as a package
!pip install git+https://huggingface.co/${e.id}

# and import it as a module
import ${t}

nlp = ${t}.load()  # or edsnlp.load("${t}")
`]},vm=e=>[`from espnet2.bin.tts_inference import Text2Speech

model = Text2Speech.from_pretrained("${e.id}")

speech, *_ = model("text to generate speech from")`],xm=e=>[`import soundfile
from espnet2.bin.asr_inference import Speech2Text

model = Speech2Text.from_pretrained(
  "${e.id}"
)

speech, rate = soundfile.read("speech.wav")
text, *_ = model(speech)[0]`],Am=()=>["unknown model type (must be text-to-speech or automatic-speech-recognition)"],ai=e=>e.tags.includes("text-to-speech")?vm(e):e.tags.includes("automatic-speech-recognition")?xm(e):Am(),ni=e=>[`from fairseq.checkpoint_utils import load_model_ensemble_and_task_from_hf_hub

models, cfg, task = load_model_ensemble_and_task_from_hf_hub(
    "${e.id}"
)`],ii=e=>[`from flair.data import Sentence
from flair.models import SequenceTagger

tagger = SequenceTagger.load("${e.id}")

sentence = Sentence("George Washington went to Washington.")
tagger.predict(sentence)
print(sentence)`],si=e=>["pip install flexray",`from fxr.inference import FleXraySegmenter

segmenter = FleXraySegmenter.from_pretrained("${e.id}")
prediction = segmenter.predict("image.png", threshold=0.5)
masks = prediction.masks`],li=()=>["pip install git+https://github.com/SAP-samples/flextab",`# Run a classification task
from sklearn.datasets import load_breast_cancer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from flextab import FlexTabClassifier

# Load sample data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize a classifier, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
clf = FlexTabClassifier(max_context_size=8192, bagging=8)

clf.fit(X_train, y_train)

# Predict probabilities
prediction_probabilities = clf.predict_proba(X_test)
# Predict labels
predictions = clf.predict(X_test)
print("Accuracy", accuracy_score(y_test, predictions))`,`# Run a regression task
from sklearn.datasets import fetch_openml
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split

from flextab import FlexTabRegressor

# Load sample data
df = fetch_openml(data_id=531, as_frame=True)
X = df.data
y = df.target.astype(float)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize the regressor, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
regressor = FlexTabRegressor(max_context_size=8192, bagging=8)

regressor.fit(X_train, y_train)

# Predict on the test set
predictions = regressor.predict(X_test)

r2 = r2_score(y_test, predictions)
print("R\xB2 Score:", r2)`,`# Run a matching task
from sklearn.metrics import accuracy_score, roc_auc_score

from flextab import FlexTabMatcher
from flextab.utils.test_utils import load_febrl4

left_train, left_test, right_train, right_test, y_train, y_test = load_febrl4()

matcher = FlexTabMatcher(max_context_size=8192, bagging=1)
matcher.fit(left_train, right_train, y_train)
predictions = matcher.predict(left_test, right_test)
print(f'Accuracy {accuracy_score(y_test, predictions):.2%}')
# Probabilities (e.g. for thresholding or AUROC):
# probas = matcher.predict_proba_matching(left_test, right_test)
# print(f'AUROC {roc_auc_score(y_test, probas[:, 1]):.2%}')`],pi=e=>[`# pip install "gaussianformer @ git+https://github.com/SVLwoof/gaussianformer"
from gaussianformer import GaussianFormerRenderingPipeline, load_ply

pipeline = GaussianFormerRenderingPipeline.from_pretrained("${e.id}").to("cuda")
gaussians = load_ply("object.ply")  # 3D Gaussian Splatting PLY -> [N, 14]`],ci=e=>[`from gliner import GLiNER

model = GLiNER.from_pretrained("${e.id}")

text = "Cristiano Ronaldo dos Santos Aveiro was born on 5 February 1985 in Funchal, Madeira, Portugal."
labels = ["person", "date", "location"]

entities = model.predict_entities(text, labels)
for entity in entities:
    print(entity["text"], "=>", entity["label"])`],di=e=>[`from gliner2 import AutoExtractor

extractor = AutoExtractor.from_pretrained("${e.id}")

# Extract entities
text = "Apple CEO Tim Cook announced iPhone 15 in Cupertino yesterday."
result = extractor.extract_entities(text, ["company", "person", "product", "location"])

print(result)`],mi=e=>[`# Download model
from huggingface_hub import snapshot_download

snapshot_download("${e.id}", local_dir="checkpoints")

from indextts.infer import IndexTTS

# Ensure config.yaml is present in the checkpoints directory
tts = IndexTTS(model_dir="checkpoints", cfg_path="checkpoints/config.yaml")

voice = "path/to/your/reference_voice.wav"  # Path to the voice reference audio file
text = "Hello, how are you?"
output_path = "output_index.wav"

tts.infer(voice, text, output_path)`],ui=e=>[`# CLI usage
# see docs: https://ai-riksarkivet.github.io/htrflow/latest/getting_started/quick_start.html
htrflow pipeline <path/to/pipeline.yaml> <path/to/image>`,`# Python usage
from htrflow.pipeline.pipeline import Pipeline
from htrflow.pipeline.steps import Task
from htrflow.models.framework.model import ModelClass

pipeline = Pipeline(
    [
        Task(
            ModelClass, {"model": "${e.id}"}, {}
        ),
    ])`],fi=e=>{let t='pip install "jev-style[torch]"';return e.tags.includes("mlx")?t=`# Apple silicon
pip install "jev-style[mlx]"`:e.tags.includes("gguf")&&(t=`pip install jev-style
# GGUF builds score through llama.cpp: build the jev-score binary once
hf download ${e.id} build_jev_score.sh jev_score.cpp --local-dir jev-score
export JEV_SCORE_BIN=$(sh jev-score/build_jev_score.sh /path/to/llama.cpp | tail -n 1)`),[t,`from jev_style import JevStyle, noul, choice

js = JevStyle.from_pretrained("${e.id}")
out = js.decide("I was charged twice for one order.", {
    "billing": noul("This message is about billing."),
    "team": choice("Which team should handle it?", ["billing", "shipping", "tech"]),
})
print(out["answers"]["team"]["choice"])`]},gi=e=>[`# !pip install -U keras tensorflow huggingface_hub
# Keras needs TensorFlow installed to read "hf://" paths, so the tensorflow backend is selected here;
# "jax" and "torch" also work for computation once TensorFlow is installed.
import os
os.environ["KERAS_BACKEND"] = "tensorflow"

import keras

model = keras.saving.load_model("hf://${e.id}")
`],hi=e=>[`# pip install -U zeromodels
# ZeroModels is pure Keras 3, so pick a backend: "jax", "torch" or "tensorflow".
import os
os.environ["KERAS_BACKEND"] = "jax"

from zeromodels import AutoZModel

# AutoZModel reads the repo's model_type and loads the matching class.
# For a task head use the matching loader, e.g. AutoZMImageClassify / AutoZMDetect /
# AutoZMSemanticSegment / AutoZMTextGenerate (see zeromodels.auto).
model = AutoZModel.from_weights("${e.id}")
`],km=e=>`
import keras_hub

# Load CausalLM model (optional: use half precision for inference)
causal_lm = keras_hub.models.CausalLM.from_preset("hf://${e}", dtype="bfloat16")
causal_lm.compile(sampler="greedy")  # (optional) specify a sampler

# Generate text
causal_lm.generate("Keras: deep learning for", max_length=64)
`,Im=e=>`
import keras_hub

# Load TextToImage model (optional: use half precision for inference)
text_to_image = keras_hub.models.TextToImage.from_preset("hf://${e}", dtype="bfloat16")

# Generate images with a TextToImage model.
text_to_image.generate("Astronaut in a jungle")
`,Tm=e=>`
import keras_hub

# Load TextClassifier model
text_classifier = keras_hub.models.TextClassifier.from_preset(
    "hf://${e}",
    num_classes=2,
)
# Fine-tune
text_classifier.fit(x=["Thilling adventure!", "Total snoozefest."], y=[1, 0])
# Classify text
text_classifier.predict(["Not my cup of tea."])
`,Sm=e=>`
import keras_hub
import keras

# Load ImageClassifier model
image_classifier = keras_hub.models.ImageClassifier.from_preset(
    "hf://${e}",
    num_classes=2,
)
# Fine-tune
image_classifier.fit(
    x=keras.random.randint((32, 64, 64, 3), 0, 256),
    y=keras.random.randint((32, 1), 0, 2),
)
# Classify image
image_classifier.predict(keras.random.randint((1, 64, 64, 3), 0, 256))
`,An={CausalLM:km,TextToImage:Im,TextClassifier:Tm,ImageClassifier:Sm},Rm=(e,t)=>`
import keras_hub

# Create a ${e} model
task = keras_hub.models.${e}.from_preset("hf://${t}")
`,Em=e=>`
import keras_hub

# Create a Backbone model unspecialized for any task
backbone = keras_hub.models.Backbone.from_preset("hf://${e}")
`,yi=e=>{let t=e.id,o=(e.config?.keras_hub?.tasks??[]).filter(br),r=[];for(let[a,n]of Object.entries(An))o.includes(a)&&r.push(n(t));for(let a of o)Object.keys(An).includes(a)||r.push(Rm(a,t));return r.push(Em(t)),r},bi=e=>[`# !pip install kernels

from kernels import get_kernel

# a version (or an explicit revision) is required; see the "Files and versions" tab for the available ones
kernel = get_kernel("${e.id}", version=1)`],wi=e=>[`# Example usage for KimiAudio
# pip install git+https://github.com/MoonshotAI/Kimi-Audio.git "transformers<5"

import soundfile as sf
from kimia_infer.api.kimia import KimiAudio

model = KimiAudio(model_path="${e.id}", load_detokenizer=True)

sampling_params = {
    "audio_temperature": 0.8,
    "audio_top_k": 10,
    "text_temperature": 0.0,
    "text_top_k": 5,
}

# For ASR
asr_audio = "asr_example.wav"
messages_asr = [
    {"role": "user", "message_type": "text", "content": "Please transcribe the following audio:"},
    {"role": "user", "message_type": "audio", "content": asr_audio}
]
_, text = model.generate(messages_asr, **sampling_params, output_type="text")
print(text)

# For Q&A
qa_audio = "qa_example.wav"
messages_conv = [{"role": "user", "message_type": "audio", "content": qa_audio}]
wav, text = model.generate(messages_conv, **sampling_params, output_type="both")
sf.write("output_audio.wav", wav.cpu().view(-1).numpy(), 24000)
print(text)
`],_i=e=>[`from kittentts import KittenTTS
m = KittenTTS("${e.id}")

audio = m.generate("This high quality TTS model works without a GPU")

# Save the audio
import soundfile as sf
sf.write('output.wav', audio, 24000)`];function Pm(e){let t=[e.id,...e.tags??[]],o=e.cardData?.base_model;return Array.isArray(o)?t.push(...o):o&&t.push(o),t.some(r=>/ltx[-_]?2\.5/i.test(r))}var Cm="# For image-to-video, add: --image path/to/image.jpg 0 0.8",vi="models/gemma-3-12b",tr="A beautiful sunset over the ocean";function xi(e){return`# Install the LTX-2 pipelines
git clone https://github.com/Lightricks/LTX-2.git
cd LTX-2
uv sync ${e?"--extra natten":"--frozen"}`}function ke(e,t,o,r){let a=`uv run python -m ltx_pipelines.${e} \\
    ${t.join(` \\
    `)}`,n=[`# ${o}`,a];return r?.footer&&n.push(r.footer),r?.hint&&n.push(Cm),n.join(`
`)}var yr="Lightricks/LTX-2.5-22b-IC-LoRA-Pixel-Spatial-Upscaler",Lm="ltx-2.5-22b-ic-lora-pixel-spatial-upscaler-x2-1.0.safetensors";function er(e){let t=[`--transformer-path ${e.transformer}`,`--text-encoder-path ${e.textEncoder}`,`--video-vae-path ${e.videoVae}`,`--audio-vae-path ${e.audioVae}`,`--spatial-upsampler-path ${e.spatialUpsampler}`];return e.temporalUpsampler&&t.push(`--temporal-upsampler-path ${e.temporalUpsampler}`),t}function Um(e){let t={transformer:`${e}/diffusion_models/<distilled-transformer>.safetensors`,textEncoder:`${e}/text_encoders/gemma4-12b-with-proj-ltx-2.5-bf16.safetensors`,videoVae:`${e}/vae/<video-vae>.safetensors`,audioVae:`${e}/vae/<audio-vae>.safetensors`,spatialUpsampler:`${e}/latent_upscale_models/<spatial-upsampler>.safetensors`};return{distilled:t,dfr:{...t,temporalUpsampler:`${e}/latent_upscale_models/<temporal-upsampler>.safetensors`}}}function Mm(){return{transformer:"path/to/distilled-transformer.safetensors",textEncoder:"path/to/gemma4-12b-with-proj-ltx-2.5-bf16.safetensors",videoVae:"path/to/video-vae.safetensors",audioVae:"path/to/audio-vae.safetensors",spatialUpsampler:"path/to/spatial-upsampler.safetensors"}}function hr(e,t,o){if(o==="adapter")return`# Download the adapter weights from this repo
# (base components come from Lightricks/LTX-2.5 \u2014 see Files and versions)
hf download ${e} --local-dir ${t}`;let r=`models/${yr.split("/")[1]}`;return`# Download weights from this repo
# Substitute filenames from this repo's "Files and versions" if they differ
hf download ${e} \\
    diffusion_models/<distilled-transformer>.safetensors \\
    text_encoders/gemma4-12b-with-proj-ltx-2.5-bf16.safetensors \\
    vae/<video-vae>.safetensors \\
    vae/<audio-vae>.safetensors \\
    latent_upscale_models/<spatial-upsampler>.safetensors \\
    latent_upscale_models/<temporal-upsampler>.safetensors \\
    --local-dir ${t}
# DFR requires the detailing IC-LoRA (separate repo; strength is fixed at 0.5)
hf download ${yr} --local-dir ${r}`}function Om(e,t){return`# Download the weights from this repo, plus the Gemma text encoder
hf download ${e} --local-dir ${t}
hf download google/gemma-3-12b-it-qat-q4_0-unquantized --local-dir ${vi}`}function Dm(e,t,o){let r=xi(!0),a=`--lora ${t}/<weights>.safetensors 1.0`,n=Mm();if(o.includes("ic-lora"))return[r,hr(e.id,t,"adapter"),ke("ic_lora",[...er(n),a,"--video-conditioning reference.mp4 1.0",'--prompt "your prompt here"',"--output-path output.mp4"],"Video-to-video with the IC-LoRA (runs on the distilled LTX-2.5 base)")];if(o.includes("lora"))return[r,hr(e.id,t,"adapter"),ke("distilled",[...er(n),a,'--prompt "your prompt here"',"--output-path output.mp4"],"Text/image-to-video with the LoRA on the distilled LTX-2.5 pipeline",{hint:!0})];let{distilled:i,dfr:s}=Um(t),d=`models/${yr.split("/")[1]}`;return[r,hr(e.id,t,"base"),ke("distilled",[...er(i),"--num-frames 121",`--prompt "${tr}"`,"--output-path output.mp4"],"Distilled LTX-2.5 pipeline (fast)",{hint:!0}),ke("dfr_pipeline",[...er(s),`--detailing-lora ${d}/${Lm}`,"--spatial-upscalings 1","--temporal-upscalings 1","--height 1088","--width 1920","--num-frames 121",`--prompt "${tr}"`,"--output-path output.mp4"],"DFR pipeline (higher detail fidelity; optional temporal 2x/4x)",{footer:"# For 4K: --spatial-upscalings 2 --width 3840 --height 2176",hint:!0})]}function Nm(e,t,o){let r=xi(!1),a=Om(e.id,t),n=`--lora ${t}/<weights>.safetensors 1.0`,i=`--gemma-root ${vi}`;return o.includes("ic-lora")?[r,a,ke("ic_lora",["--distilled-checkpoint-path path/to/distilled_checkpoint.safetensors","--spatial-upsampler-path path/to/spatial_upsampler.safetensors",i,n,"--video-conditioning reference.mp4 1.0",'--prompt "your prompt here"',"--output-path output.mp4"],"Video-to-video with the IC-LoRA (runs on the distilled base model)")]:o.includes("lora")?[r,a,ke("ti2vid_two_stages_hq",["--checkpoint-path path/to/checkpoint.safetensors","--distilled-lora path/to/distilled_lora.safetensors 0.8","--spatial-upsampler-path path/to/spatial_upsampler.safetensors",i,n,'--prompt "your prompt here"',"--output-path output.mp4"],"Text/image-to-video with the LoRA on the HQ two-stage base pipeline",{hint:!0})]:[r,a,ke("distilled",[`--distilled-checkpoint-path ${t}/<distilled-checkpoint>.safetensors`,`--spatial-upsampler-path ${t}/<spatial-upsampler>.safetensors`,i,`--prompt "${tr}"`,"--output-path output.mp4"],"Fast pipeline (distilled model, no distilled LoRA needed)",{hint:!0}),ke("ti2vid_two_stages_hq",[`--checkpoint-path ${t}/<checkpoint>.safetensors`,`--distilled-lora ${t}/<distilled-lora>.safetensors 0.8`,`--spatial-upsampler-path ${t}/<spatial-upsampler>.safetensors`,i,`--prompt "${tr}"`,"--output-path output.mp4"],"HQ pipeline (two-stage, higher quality)",{hint:!0})]}var Ai=e=>{let t=`models/${ae(e.id)}`,o=e.tags??[];return Pm(e)?Dm(e,t,o):Nm(e,t,o)},ki=e=>e.tags.includes("bi-encoder")?[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import BiEncoderModule
model = BiEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`]:e.tags.includes("cross-encoder")?[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import CrossEncoderModule
model = CrossEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`]:[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import BiEncoderModule, CrossEncoderModule

# depending on the model type, use either BiEncoderModule or CrossEncoderModule
model = BiEncoderModule("${e.id}")
# model = CrossEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`],Ii=e=>{let t=[`# !pip install llama-cpp-python

from llama_cpp import Llama

llm = Llama.from_pretrained(
	repo_id="${e.id}",
	filename="{{GGUF_FILE}}",
)
`];if(e.tags.includes("conversational")){let o=fe(e);t.push(`llm.create_chat_completion(
	messages = ${Zo(o,{attributeKeyQuotes:!0,indent:"	"})}
)`)}else t.push(`output = llm(
	"Once upon a time,",
	max_tokens=512,
	echo=True
)
print(output)`);return t},Ti=e=>{if(e.tags.includes("smolvla")){let t=[`# See https://github.com/huggingface/lerobot?tab=readme-ov-file#installation for more details
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e .[smolvla]`,`# Launch finetuning on your dataset
python lerobot/scripts/train.py \\
--policy.path=${e.id} \\
--dataset.repo_id=lerobot/svla_so101_pickplace \\
--batch_size=64 \\
--steps=20000 \\
--output_dir=outputs/train/my_smolvla \\
--job_name=my_smolvla_training \\
--policy.device=cuda \\
--wandb.enable=true`];return e.id!=="lerobot/smolvla_base"&&t.push(`# Run the policy using the record function
python -m lerobot.record \\
  --robot.type=so101_follower \\
  --robot.port=/dev/ttyACM0 \\ # <- Use your port
  --robot.id=my_blue_follower_arm \\ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 8, width: 640, height: 480, fps: 30}}" \\ # <- Use your cameras
  --dataset.single_task="Grasp a lego block and put it in the bin." \\ # <- Use the same task description you used in your dataset recording
  --dataset.repo_id=HF_USER/dataset_name \\  # <- This will be the dataset name on HF Hub
  --dataset.episode_time_s=50 \\
  --dataset.num_episodes=10 \\
  --policy.path=${e.id}`),t}return[]},Si=e=>[`# LiteRT-LM runs on various platforms (Android, iOS, Windows, Linux, macOS, IoT, Web/WASM)
# and supports many APIs (C++, Python, Kotlin, Swift, JavaScript, Flutter).
# For platform-specific integration guides, please refer to the official developer website:
# https://ai.google.dev/edge/litert-lm

# To try LiteRT-LM, the easiest way is to use our CLI tool.
# 1. Install the LiteRT-LM CLI tool:
pip install -U litert-lm

# 2. Download and run this model locally:
# See: https://ai.google.dev/edge/litert-lm/cli
# A single .litertlm file in the repo is picked automatically; otherwise the CLI asks which one to run
# (or pass its name right after the repo id).
litert-lm run \\
  --from-huggingface-repo=${e.id} \\
  --prompt="Write me a poem"`],Ri=e=>[`# Note: 'keras<3.x' or 'tf_keras' must be installed (legacy), and from_pretrained_keras was removed in huggingface_hub 1.0.
# See https://github.com/keras-team/tf-keras for more details.
# !pip install "huggingface_hub<1.0" tf_keras
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("${e.id}")
`],Ei=e=>[`from mamba_ssm import MambaLMHeadModel

model = MambaLMHeadModel.from_pretrained("${e.id}")`],Pi=e=>[`# Install from https://github.com/Camb-ai/MARS5-TTS

from inference import Mars5TTS
mars5 = Mars5TTS.from_pretrained("${e.id}")`],Ci=e=>[`# Install from https://github.com/pq-yang/MatAnyone.git

from matanyone.model.matanyone import MatAnyone
model = MatAnyone.from_pretrained("${e.id}")`,`
from matanyone import InferenceCore
processor = InferenceCore("${e.id}")`],Li=e=>[`# memra serves NVIDIA Blackwell workstation and consumer cards (sm_120a), with a
# compile-gated Hopper lane. Prebuilt binaries need Linux x86_64 and driver 580+,
# and no CUDA toolkit.
curl -fsSL https://raw.githubusercontent.com/avifenesh/memra/main/tools/install.sh | sh`,`# One chat-templated generation. In a repo with several GGUF files, append
# :<substring> to choose one, for example hf:${e.id}:Q4_K_M
MEMRA_CHAT=1 run-gen hf:${e.id} --prompt "Explain KV caches in one sentence."`,`# Or an OpenAI-compatible server on 127.0.0.1:8080.
MEMRA_MODELS="model=hf:${e.id}" memra-server`],Ui=()=>[`# Install from https://github.com/buaacyw/MeshAnything.git

from MeshAnything.models.meshanything import MeshAnything

# refer to https://github.com/buaacyw/MeshAnything/blob/main/main.py#L91 on how to define args
# and https://github.com/buaacyw/MeshAnything/blob/main/app.py regarding usage
model = MeshAnything(args)`],Mi=e=>{let t=["walk","stand","sitstand","ground_pick","kick_left","kick_right","roulade"],o=t.filter(n=>e.tags.includes(`microduck-slot:${n}`)),r=o.length===1?o[0]:"SLOT";return[`${o.length===1?"":`# Replace SLOT with the slot specified in the model card (${t.join(", ")}).
`}sudo robotctl policy load ${r} ${e.id}`]},Oi=e=>{let t=e.widgetData?.[0],o=Ie(t?.text??""),r=e.mask_token??"<mask>",a=o?.replace(r,"A"),n=["pip install multimolecule"];return a?n.push(`from multimolecule import AutoModel, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("${e.id}")
model = AutoModel.from_pretrained("${e.id}")

inputs = tokenizer("${a}", return_tensors="pt")
outputs = model(**inputs)
embeddings = outputs.last_hidden_state`):n.push(`from multimolecule import AutoModel, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("${e.id}")
model = AutoModel.from_pretrained("${e.id}")`),e.tags.includes("rna-secondary-structure")&&o?n.push(`import multimolecule
from transformers import pipeline

predictor = pipeline("rna-secondary-structure", model="${e.id}")
output = predictor("${o}")
print(output["secondary_structure"])`):e.pipeline_tag==="fill-mask"&&o&&n.push(`import multimolecule
from transformers import pipeline

predictor = pipeline("fill-mask", model="${e.id}")
output = predictor("${o}")`),n},Di=e=>[`import open_clip

model, preprocess_train, preprocess_val = open_clip.create_model_and_transforms('hf-hub:${e.id}')
tokenizer = open_clip.get_tokenizer('hf-hub:${e.id}')`],Ni=e=>{let t=e.id.split("/").pop()??e.id;return[`# Install the openasr CLI: https://github.com/QuintinShaw/openasr/releases
openasr pull ${t}
openasr transcribe audio.wav --model ${t}`]},$i=()=>[`# pip install 'opendde[gpu]'
# Checkpoints are fetched from the Hub into $OPENDDE_ROOT_DIR (default ~/.cache/opendde)
opendde doctor
opendde pred -i examples/input.json -o ./output -n opendde_v1`],ji=e=>{let t=e.config?.architectures?.[0];return t&&br(t)?[[`from paddlenlp.transformers import AutoTokenizer, ${t}`,"",`tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`,`model = ${t}.from_pretrained("${e.id}", from_hf_hub=True)`].join(`
`)]:[["# \u26A0\uFE0F Type of model unknown","from paddlenlp.transformers import AutoTokenizer, AutoModel","",`tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`,`model = AutoModel.from_pretrained("${e.id}", from_hf_hub=True)`].join(`
`)]},qi=e=>{let t={textline_detection:{className:"TextDetection"},textline_recognition:{className:"TextRecognition"},seal_text_detection:{className:"SealTextDetection"},doc_img_unwarping:{className:"TextImageUnwarping"},doc_img_orientation_classification:{className:"DocImgOrientationClassification"},textline_orientation_classification:{className:"TextLineOrientationClassification"},chart_parsing:{className:"ChartParsing"},formula_recognition:{className:"FormulaRecognition"},layout_detection:{className:"LayoutDetection"},table_cells_detection:{className:"TableCellsDetection"},wired_table_classification:{className:"TableClassification"},table_structure_recognition:{className:"TableStructureRecognition"}};if(e.tags.includes("doc_vlm"))return[`# 1. See https://www.paddlepaddle.org.cn/en/install to install paddlepaddle
# 2. pip install paddleocr

from paddleocr import DocVLM
model = DocVLM(model_name="${ae(e.id)}")
output = model.predict(
    input={"image": "path/to/image.png", "query": "Parsing this image and output the content in Markdown format."},
    batch_size=1
)
for res in output:
    res.print()
    res.save_to_json(save_path="./output/res.json")`];if(e.tags.includes("document-parse")){let o=e.id.replace("PaddlePaddle/PaddleOCR-VL-","v");return[`# See https://www.paddleocr.ai/latest/version3.x/pipeline_usage/PaddleOCR-VL.html to installation

from paddleocr import PaddleOCRVL
pipeline = PaddleOCRVL(pipeline_version="${o==="PaddlePaddle/PaddleOCR-VL"?"v1":o}")
output = pipeline.predict("path/to/document_image.png")
for res in output:
	res.print()
	res.save_to_json(save_path="output")
	res.save_to_markdown(save_path="output")`]}for(let o of e.tags)if(o in t){let{className:r}=t[o];return[`# 1. See https://www.paddlepaddle.org.cn/en/install to install paddlepaddle
# 2. pip install paddleocr

from paddleocr import ${r}
model = ${r}(model_name="${ae(e.id)}")
output = model.predict(input="path/to/image.png", batch_size=1)
for res in output:
    res.print()
    res.save_to_img(save_path="./output/")
    res.save_to_json(save_path="./output/res.json")`]}return[`# Please refer to the document for information on how to use the model.
# https://paddlepaddle.github.io/PaddleOCR/latest/en/version3.x/module_usage/module_overview.html`]},Bi=e=>{let t=`# Use PE-Core models as CLIP models
import core.vision_encoder.pe as pe

model = pe.CLIP.from_config("${e.id}", pretrained=True)`,o=`# Use any PE model as a vision encoder
import core.vision_encoder.pe as pe

model = pe.VisionTransformer.from_config("${e.id}", pretrained=True)`;return e.id.includes("Core")?[t,o]:[o]},Fi=e=>[`from huggingface_hub import snapshot_download
from phantom_wan import WanI2V, configs
from PIL import Image

checkpoint_dir = snapshot_download("${e.id}")
wan_i2v = WanI2V(
    config=configs.WAN_CONFIGS['i2v-14B'],
    checkpoint_dir=checkpoint_dir,
)

text_prompt = "A cat playing with a ball of yarn"
image_prompt = Image.open("path/to/image.jpg").convert("RGB")
video = wan_i2v.generate(text_prompt, image_prompt)`],Vi=e=>[`from pocket_tts import TTSModel
import scipy.io.wavfile

tts_model = TTSModel.load_model("${e.id}")
voice_state = tts_model.get_state_for_audio_prompt(
    "hf://kyutai/tts-voices/alba-mackenna/casual.wav"
)
audio = tts_model.generate_audio(voice_state, "Hello world, this is a test.")
# Audio is a 1D torch tensor containing PCM data.
scipy.io.wavfile.write("output.wav", tts_model.sample_rate, audio.numpy())`],$m=e=>[`from pyannote.audio import Pipeline

pipeline = Pipeline.from_pretrained("${e.id}")

# inference on the whole file
pipeline("file.wav")

# inference on an excerpt
from pyannote.core import Segment
excerpt = Segment(start=2.0, end=5.0)

from pyannote.audio import Audio
waveform, sample_rate = Audio().crop("file.wav", excerpt)
pipeline({"waveform": waveform, "sample_rate": sample_rate})`],jm=e=>[`from pyannote.audio import Model, Inference

model = Model.from_pretrained("${e.id}")
inference = Inference(model)

# inference on the whole file
inference("file.wav")

# inference on an excerpt
from pyannote.core import Segment
excerpt = Segment(start=2.0, end=5.0)
inference.crop("file.wav", excerpt)`],Hi=e=>e.tags.includes("pyannote-audio-pipeline")?$m(e):jm(e),Xi=e=>[`from relik import Relik

relik = Relik.from_pretrained("${e.id}")`],Yi=e=>[`# Install from https://github.com/microsoft/renderformer

from renderformer import RenderFormerRenderingPipeline
pipeline = RenderFormerRenderingPipeline.from_pretrained("${e.id}")`],zi=e=>[`# pip install routee.powertrain
import pandas as pd
import routee.powertrain as pt
from routee.powertrain.registry import HFRegistry

registry = HFRegistry(repo_id="${e.id}")

# find a vehicle: filter by make, model, year, powertrain type, features, ...
pt.query_available_models(make="tesla", model="model 3", registry=registry)

# load one by its id: "<make>/<vehicle_slug>/<year>/<config_slug>"
model = pt.load_model("tesla/model_3_bev/2022/rf_c3326385", registry=registry)

links = pd.DataFrame({
    "distance": [0.1, 0.2],  # miles
    "speed_mph": [30, 55],
    "grade_percent": [-2.0, 1.0],
})
model.predict(links)`],qm=e=>[`from tensorflow_tts.inference import AutoProcessor, TFAutoModel

processor = AutoProcessor.from_pretrained("${e.id}")
model = TFAutoModel.from_pretrained("${e.id}")
`],Bm=e=>[`from tensorflow_tts.inference import TFAutoModel

model = TFAutoModel.from_pretrained("${e.id}")
audios = model.inference(mels)
`],Fm=e=>[`from tensorflow_tts.inference import TFAutoModel

model = TFAutoModel.from_pretrained("${e.id}")
`],Wi=e=>e.tags.includes("text-to-mel")?qm(e):e.tags.includes("mel-to-wav")?Bm(e):Fm(e),Ki=e=>[`import timm

model = timm.create_model("hf-hub:${e.id}", pretrained=True)`],Qi=()=>[`# pip install sae-lens
from sae_lens import SAE

sae, cfg_dict, sparsity = SAE.from_pretrained(
    release = "RELEASE_ID", # e.g., "gpt2-small-res-jb". See other options in https://github.com/jbloomAus/SAELens/blob/main/sae_lens/pretrained_saes.yaml
    sae_id = "SAE_ID", # e.g., "blocks.8.hook_resid_pre". Won't always be a hook point
)`],Ji=()=>[`# seed_story_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/agent_7b_sft.yaml'
# llm_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/llama2chat7b_lora.yaml'
from omegaconf import OmegaConf
import hydra

# load Llama2
llm_cfg = OmegaConf.load(llm_cfg_path)
llm = hydra.utils.instantiate(llm_cfg, torch_dtype="fp16")

# initialize seed_story
seed_story_cfg = OmegaConf.load(seed_story_cfg_path)
seed_story = hydra.utils.instantiate(seed_story_cfg, llm=llm) `],kn=/\.(joblib|pkl|pickle)$/i,In=(e,t)=>[`from huggingface_hub import hf_hub_download
import joblib
model = joblib.load(
	hf_hub_download("${e.id}", "${Ie(t)}")
)
# only load pickle files from sources you trust
# read more about it here https://skops.readthedocs.io/en/stable/persistence.html`],Vm=(e,t)=>[`from huggingface_hub import hf_hub_download
from skops.io import load
# make sure model file is in skops format
# if model is a pickle file, make sure it's from a source you trust
model = load(hf_hub_download("${e.id}", "${Ie(t)}"))`],Gi=e=>{let t=e.config?.sklearn?.model?.file;return e.tags.includes("skops")?t?e.config?.sklearn?.model_format==="pickle"||kn.test(t)?In(e,t):Vm(e,t):["# \u26A0\uFE0F Model filename not specified in config.json"]:In(e,t&&kn.test(t)?t:"sklearn_model.joblib")},Zi=e=>[`import torch
import torchaudio
from einops import rearrange
from stable_audio_tools import get_pretrained_model
from stable_audio_tools.inference.generation import generate_diffusion_cond

device = "cuda" if torch.cuda.is_available() else "cpu"

# Download model
model, model_config = get_pretrained_model("${e.id}")
sample_rate = model_config["sample_rate"]
sample_size = model_config["sample_size"]

model = model.to(device)

# Set up text and timing conditioning
conditioning = [{
	"prompt": "128 BPM tech house drum loop",
}]

# Generate stereo audio
output = generate_diffusion_cond(
	model,
	conditioning=conditioning,
	sample_size=sample_size,
	device=device
)

# Rearrange audio batch to a single sequence
output = rearrange(output, "b d n -> d (b n)")

# Peak normalize, clip, convert to int16, and save to file
output = output.to(torch.float32).div(torch.max(torch.abs(output))).clamp(-1, 1).mul(32767).to(torch.int16).cpu()
torchaudio.save("output.wav", output, sample_rate)`],es=e=>[`from huggingface_hub import from_pretrained_fastai

learn = from_pretrained_fastai("${e.id}")`],ts=e=>{let t=`# Use SAM2 with images
import torch
from sam2.sam2_image_predictor import SAM2ImagePredictor

predictor = SAM2ImagePredictor.from_pretrained("${e.id}")

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    predictor.set_image(<your_image>)
    masks, _, _ = predictor.predict(<input_prompts>)`,o=`# Use SAM2 with videos
import torch
from sam2.sam2_video_predictor import SAM2VideoPredictor

predictor = SAM2VideoPredictor.from_pretrained("${e.id}")

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    state = predictor.init_state(<your_video>)

    # add new prompts and instantly get the output on the same frame
    frame_idx, object_ids, masks = predictor.add_new_points(state, <your_prompts>)

    # propagate the prompts to get masklets throughout the video
    for frame_idx, object_ids, masks in predictor.propagate_in_video(state):
        ...`;return[t,o]},os=e=>[`from inference import Inference, load_image, load_single_mask
from huggingface_hub import hf_hub_download

path = hf_hub_download("${e.id}", "pipeline.yaml")
inference = Inference(path, compile=False)

image = load_image("path_to_image.png")
mask = load_single_mask("path_to_mask.png", index=14)

output = inference(image, mask)`],rs=e=>[`import cv2
import numpy as np
from notebook.utils import setup_sam_3d_body
from tools.vis_utils import visualize_sample_together

estimator = setup_sam_3d_body("${e.id}")

img_bgr = cv2.imread("path/to/image.jpg")
outputs = estimator.process_one_image(cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB))

rend_img = visualize_sample_together(img_bgr, outputs, estimator.faces)
cv2.imwrite("output.jpg", rend_img.astype(np.uint8))`],as=e=>[`python -m sample_factory.huggingface.load_from_hub -r ${e.id} -d ./train_dir`];function Hm(e){let t=e.widgetData?.[0];if(t?.source_sentence&&t?.sentences?.length)return[t.source_sentence,...t.sentences]}var ns=e=>{let t="# Run this model on the Apple Neural Engine, without CoreML.";return e.pipeline_tag==="text-generation"?[`${t}
import aneforge as af
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("${e.id}")
model = af.load_llm("${e.id}")            # prefill + resident-KV-cache decode on the ANE
ids = tok.encode("The Neural Engine is")
print(tok.decode(model.generate(ids, max_new_tokens=20)))`]:e.pipeline_tag==="zero-shot-image-classification"||e.tags.includes("clip")?[`${t}
import aneforge as af

clip = af.load_clip("${e.id}")
labels = clip.classify(image, ["a photo of a cat", "a photo of a dog"])  # image: a PIL.Image; zero-shot (label, prob)`]:e.tags.includes("resnet")?[`${t}
import aneforge as af

net = af.load_resnet("${e.id}")             # BatchNorm folded into the preceding conv at load
logits = net(pixels)                          # pixels: a preprocessed [1, 3, 224, 224] float32 batch -> [1, 1000]`]:e.pipeline_tag==="image-classification"?[`${t}
import aneforge as af

vit = af.load_vit("${e.id}")
labels = vit.classify(image)                  # image: a PIL.Image; returns top-k (label, logit)`]:e.pipeline_tag==="automatic-speech-recognition"?[`${t}
import aneforge as af

asr = af.load_whisper("${e.id}")
text = asr.transcribe(audio)                  # audio: a 16 kHz mono float32 waveform`]:[`# Run this model's encoder on the Apple Neural Engine, without CoreML.
from aneforge.sentence_transformers import SentenceTransformer

model = SentenceTransformer("${e.id}")
embeddings = model.encode(["Hello from the Neural Engine"], normalize_embeddings=True)`]},is=e=>{let t=e.tags.includes(Rn)?", trust_remote_code=True":"";if(e.tags.includes("PyLate"))return[`from pylate import models

queries = [
    "Which planet is known as the Red Planet?",
    "What is the largest planet in our solar system?",
]

documents = [
    ["Mars is the Red Planet.", "Venus is Earth's twin."],
    ["Jupiter is the largest planet.", "Saturn has rings."],
]

model = models.ColBERT(model_name_or_path="${e.id}")

queries_emb = model.encode(queries, is_query=True)
docs_emb = model.encode(documents, is_query=False)`];if(e.tags.includes("cross-encoder")||e.pipeline_tag=="text-ranking"||e.pipeline_tag==="text-classification"&&!e.tags.includes("setfit")&&(e.config?.architectures??[]).some(n=>n.endsWith("ForSequenceClassification")))return[`from sentence_transformers import CrossEncoder

model = CrossEncoder("${e.id}"${t})

query = "Which planet is known as the Red Planet?"
passages = [
	"Venus is often called Earth's twin because of its similar size and proximity.",
	"Mars, known for its reddish appearance, is often referred to as the Red Planet.",
	"Jupiter, the largest planet in our solar system, has a prominent red spot.",
	"Saturn, famous for its rings, is sometimes mistaken for the Red Planet."
]

scores = model.predict([(query, passage) for passage in passages])
print(scores)`];let r=e.tags.includes("sparse-encoder")?"SparseEncoder":e.tags.includes("multi-vector")?"MultiVectorEncoder":void 0;if(r)return[`from sentence_transformers import ${r}

model = ${r}("${e.id}"${t})

queries = ["Which planet is known as the Red Planet?"]
documents = [
	"Venus is often called Earth's twin because of its similar size and proximity.",
	"Mars, known for its reddish appearance, is often referred to as the Red Planet.",
	"Jupiter, the largest planet in our solar system, has a prominent red spot.",
]

query_embeddings = model.encode_query(queries)
document_embeddings = model.encode_document(documents)

similarities = model.similarity(query_embeddings, document_embeddings)
print(similarities)`];let a=Hm(e)??["The weather is lovely today.","It's so sunny outside!","He drove to the stadium."];return[`from sentence_transformers import SentenceTransformer

model = SentenceTransformer("${e.id}"${t})

sentences = ${JSON.stringify(a,null,4)}
embeddings = model.encode(sentences)

similarities = model.similarity(embeddings, embeddings)
print(similarities.shape)
# [${a.length}, ${a.length}]`]},ss=e=>[`from setfit import SetFitModel

model = SetFitModel.from_pretrained("${e.id}")

preds = model.predict(["i loved the spiderman movie!", "pineapple on pizza is the worst"])
print(preds)`],ls=e=>[`!pip install https://huggingface.co/${e.id}/resolve/main/${ae(e.id)}-any-py3-none-any.whl

# Using spacy.load().
import spacy
nlp = spacy.load("${ae(e.id)}")

# Importing as module.
import ${ae(e.id)}
nlp = ${ae(e.id)}.load()`],ps=e=>[`from span_marker import SpanMarkerModel

model = SpanMarkerModel.from_pretrained("${e.id}")

entities = model.predict("Amelia Earhart flew her single engine Lockheed Vega 5B across the Atlantic to Paris.")
print(entities)`],cs=e=>[`import stanza

stanza.download("${ae(e.id).replace("stanza-","")}")
nlp = stanza.Pipeline("${ae(e.id).replace("stanza-","")}")`],Xm=e=>{switch(e){case"EncoderClassifier":return"classify_file";case"EncoderDecoderASR":case"EncoderASR":return"transcribe_file";case"SpectralMaskEnhancement":return"enhance_file";case"SepformerSeparation":return"separate_file";case"SpeakerRecognition":return"verify_files";default:return}},ds=e=>{let t=e.config?.speechbrain?.speechbrain_interface;if(t===void 0)return["# interface not specified in config.json"];let o=Xm(t);if(o===void 0)return["# interface in config.json invalid"];let r=o==="verify_files"?'"speaker1.wav", "speaker2.wav"':'"file.wav"';return[`from speechbrain.pretrained import ${t}
model = ${t}.from_hparams(
  "${e.id}"
)
model.${o}(${r})`]},ms=e=>[`from terratorch.registry import BACKBONE_REGISTRY

model = BACKBONE_REGISTRY.build("${e.id}")`],Tn=e=>e.config?.tokenizer_config?.chat_template!==void 0||e.config?.processor_config?.chat_template!==void 0||e.config?.chat_template_jinja!==void 0,us=e=>{let t=e.transformersInfo?.auto_model;return t&&br(t)?t:void 0},vr=e=>{let t=e.transformersInfo;if(!t)return["# \u26A0\uFE0F Type of model unknown"];let o=us(e)??"AutoModel",r=e.tags.includes(Rn)?", trust_remote_code=True":"",a=[];if(t.processor){let n=t.processor==="AutoTokenizer"?"tokenizer":t.processor==="AutoFeatureExtractor"?"extractor":"processor";a.push("# pip install -U transformers accelerate","# Load model directly",`from transformers import ${t.processor}, ${o}`,"",`${n} = ${t.processor}.from_pretrained("${e.id}"`+r+")",`model = ${o}.from_pretrained("${e.id}"`+r+', device_map="auto")'),e.tags.includes("conversational")&&Tn(e)&&(e.tags.includes("image-text-to-text")?a.push("messages = [",["    {",'        "role": "user",','        "content": [','            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},','            {"type": "text", "text": "What animal is on the candy?"}',"        ]","    },"].join(`
`),"]"):a.push("messages = [",'    {"role": "user", "content": "Who are you?"},',"]"),a.push(`inputs = ${n}.apply_chat_template(`,"	messages,","	add_generation_prompt=True,","	tokenize=True,","	return_dict=True,",'	return_tensors="pt",',").to(model.device)","","outputs = model.generate(**inputs, max_new_tokens=256)",`print(${n}.decode(outputs[0][inputs["input_ids"].shape[-1]:]))`))}else a.push("# pip install -U transformers accelerate","# Load model directly",`from transformers import ${o}`,`model = ${o}.from_pretrained("${e.id}"`+r+', device_map="auto")');if(e.pipeline_tag&&gr.transformers?.includes(e.pipeline_tag)){let n=["# Use a pipeline as a high-level helper"];return ka.includes(e.pipeline_tag)&&n.push(`# Warning: Pipeline type "${e.pipeline_tag}" is no longer supported in transformers v5.`,"# You must load the model directly (see below) or downgrade to v4.x with:",'# pip install "transformers<5.0.0"'),n.push("from transformers import pipeline","",`pipe = pipeline("${e.pipeline_tag}", model="${e.id}"`+r+")"),e.tags.includes("conversational")&&Tn(e)?e.tags.includes("image-text-to-text")?(n.push("messages = [",["    {",'        "role": "user",','        "content": [','            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},','            {"type": "text", "text": "What animal is on the candy?"}',"        ]","    },"].join(`
`),"]"),n.push("pipe(text=messages)")):(n.push("messages = [",'    {"role": "user", "content": "Who are you?"},',"]"),n.push("pipe(messages)")):e.pipeline_tag==="zero-shot-image-classification"?n.push("pipe(",'    "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png",','    candidate_labels=["animals", "humans", "landscape"],',")"):e.pipeline_tag==="image-classification"&&n.push('pipe("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png")'),[n.join(`
`),a.join(`
`)]}return[a.join(`
`)]},Ym={"sentence-similarity":"feature-extraction"},fs=e=>{if(!e.pipeline_tag)return["// \u26A0\uFE0F Unknown pipeline tag"];let t="@huggingface/transformers";if(e.pipeline_tag==="text-ranking")return[`// npm i ${t}
import { AutoTokenizer, AutoModelForSequenceClassification } from '${t}';

const tokenizer = await AutoTokenizer.from_pretrained('${e.id}');
const model = await AutoModelForSequenceClassification.from_pretrained('${e.id}');

const query = 'Which planet is known as the Red Planet?';
const documents = [
	'Mars, known for its reddish appearance, is often referred to as the Red Planet.',
	'Venus is often called the twin of Earth because of its similar size and proximity.',
];

const inputs = tokenizer(new Array(documents.length).fill(query), { text_pair: documents, padding: true, truncation: true });
const { logits } = await model(inputs);
console.log(logits.sigmoid().tolist()); // one relevance score per document`];let o=Ym[e.pipeline_tag]??e.pipeline_tag;return[`// npm i ${t}
import { pipeline } from '${t}';

// Allocate pipeline
const pipe = await pipeline('${o}', '${e.id}');`]},zm={CAUSAL_LM:"AutoModelForCausalLM",SEQ_2_SEQ_LM:"AutoModelForSeq2SeqLM",TOKEN_CLS:"AutoModelForTokenClassification",SEQ_CLS:"AutoModelForSequenceClassification",QUESTION_ANS:"AutoModelForQuestionAnswering",FEATURE_EXTRACTION:"AutoModel"},Wm=/whisper|\bs2t\b|speech[-_]to[-_]text/i,Km=/seamless[-_]m4t/i,Qm=["translation","text2text-generation","summarization"],Jm=/speecht5/i,Sn=(e,t)=>e.pipeline_tag===t||e.tags.includes(t),Gm=(e,t)=>{if(Wm.test(t))return"AutoModelForSpeechSeq2Seq";if(Km.test(t))return Qm.some(o=>Sn(e,o))?void 0:"AutoModelForSpeechSeq2Seq";if(Jm.test(t))return/(?:^|[^a-z])asr(?:[^a-z]|$)/i.test(t)||Sn(e,"automatic-speech-recognition")?"AutoModelForSpeechSeq2Seq":"AutoModelForTextToSpectrogram"},gs=e=>{let{base_model_name_or_path:t,task_type:o}=e.config?.peft??{},r=o?zm[o]:void 0;if(!r)return["Task type is invalid."];let a=Array.isArray(e.cardData?.base_model)?e.cardData.base_model[0]:e.cardData?.base_model,n=t||a;return n?(o==="SEQ_2_SEQ_LM"&&(r=Gm(e,n)??r),r==="AutoModelForTextToSpectrogram"?[`from peft import PeftConfig, PeftModel
from transformers import AutoModelForTextToSpectrogram

base_model = AutoModelForTextToSpectrogram.from_pretrained("${Ie(n)}")
# PEFT's seq2seq wrapper needs generate(), which SpeechT5's text-to-speech model lacks: load the adapter without its task type
config = PeftConfig.from_pretrained("${e.id}")
config.task_type = None
model = PeftModel.from_pretrained(base_model, "${e.id}", config=config)`]:[`from peft import PeftModel
from transformers import ${r}

base_model = ${r}.from_pretrained("${Ie(n)}")
model = PeftModel.from_pretrained(base_model, "${e.id}")`]):["Base model is not found."]},hs=e=>[`from huggingface_hub import hf_hub_download
import fasttext

model = fasttext.load_model(hf_hub_download("${e.id}", "model.bin"))`],ys=e=>[`from huggingface_sb3 import load_from_hub
checkpoint = load_from_hub(
	repo_id="${e.id}",
	filename="{MODEL FILENAME}.zip",
)`],Zm=(e,t)=>{if(e==="ASR")return[`import nemo.collections.asr as nemo_asr
asr_model = nemo_asr.models.ASRModel.from_pretrained("${t.id}")

transcriptions = asr_model.transcribe(["file.wav"])`]},bs=e=>[`mlagents-load-from-hf --repo-id="${e.id}" --local-dir="./downloads"`],ws=()=>[`string modelName = "[Your model name here].sentis";
Model model = ModelLoader.Load(Application.streamingAssetsPath + "/" + modelName);
IWorker engine = WorkerFactory.CreateWorker(BackendType.GPUCompute, model);
// Please see provided C# file for more details
`],_s=e=>[`
# Load the model and infer image from text
import torch
from app.sana_pipeline import SanaPipeline
from torchvision.utils import save_image

sana = SanaPipeline("configs/sana_config/1024ms/Sana_1600M_img1024.yaml")
sana.from_pretrained("hf://${e.id}")

image = sana(
    prompt='a cyberpunk cat with a neon sign that says "Sana"',
    height=1024,
    width=1024,
    guidance_scale=5.0,
    pag_guidance_scale=2.0,
    num_inference_steps=18,
) `],vs=e=>[`import torch, soundfile as sf, librosa, numpy as np
from vibevoice.processor.vibevoice_processor import VibeVoiceProcessor
from vibevoice.modular.modeling_vibevoice_inference import VibeVoiceForConditionalGenerationInference

# Load voice sample (should be 24kHz mono)
voice, sr = sf.read("path/to/voice_sample.wav")
if voice.ndim > 1: voice = voice.mean(axis=1)
if sr != 24000: voice = librosa.resample(voice, sr, 24000)

processor = VibeVoiceProcessor.from_pretrained("${e.id}")
model = VibeVoiceForConditionalGenerationInference.from_pretrained(
    "${e.id}", torch_dtype=torch.bfloat16
).to("cuda").eval()
model.set_ddpm_inference_steps(5)

inputs = processor(text=["Speaker 0: Hello!\\nSpeaker 1: Hi there!"],
                   voice_samples=[[voice]], return_tensors="pt")
audio = model.generate(**inputs, cfg_scale=1.3,
                       tokenizer=processor.tokenizer).speech_outputs[0]
sf.write("output.wav", audio.cpu().numpy().squeeze(), 24000)`],xs=e=>[`# Install from https://github.com/google-deepmind/videoprism
import jax
from videoprism import models as vp

flax_model = vp.get_model("${e.id}")
loaded_state = vp.load_pretrained_weights("${e.id}")

@jax.jit
def forward_fn(inputs, train=False):
  return flax_model.apply(loaded_state, inputs, train=train)`],As=e=>[`from Trainer_finetune import Model

model = Model.from_pretrained("${e.id}")`],ks=e=>[`from huggingface_hub import hf_hub_download
from inference_onnx import LVFaceONNXInferencer

model_path = hf_hub_download("${e.id}", "LVFace-L_Glint360K/LVFace-L_Glint360K.onnx")
inferencer = LVFaceONNXInferencer(model_path, use_gpu=True)
img_path = 'path/to/image1.jpg'
embedding = inferencer.infer_from_image(img_path)`],Is=e=>[`from voicecraft import VoiceCraft

model = VoiceCraft.from_pretrained("${e.id}")`],Ts=e=>[`import soundfile as sf
from voxcpm import VoxCPM

model = VoxCPM.from_pretrained("${e.id}")

wav = model.generate(
    text="VoxCPM is an innovative end-to-end TTS model from ModelBest, designed to generate highly expressive speech.",
    prompt_wav_path=None,      # optional: path to a prompt speech for voice cloning
    prompt_text=None,          # optional: reference text
    cfg_value=2.0,             # LM guidance on LocDiT, higher for better adherence to the prompt, but maybe worse
    inference_timesteps=10,   # LocDiT inference timesteps, higher for better result, lower for fast speed
    normalize=True,           # enable external TN tool
    denoise=True,             # enable external Denoise tool
    retry_badcase=True,        # enable retrying mode for some bad cases (unstoppable)
    retry_badcase_max_times=3,  # maximum retrying times
    retry_badcase_ratio_threshold=6.0, # maximum length restriction for bad case detection (simple but effective), it could be adjusted for slow pace speech
)

sf.write("output.wav", wav, 16000)
print("saved: output.wav")`],Ss=()=>[`# !pip install git+https://github.com/fluxions-ai/vui

import torchaudio

from vui.legacy import Vui, render

model = Vui.from_pretrained().cuda()
waveform = render(
    model,
    "Hey, here is some random stuff, usually something quite long as the shorter the text the less likely the model can cope!",
)
print(waveform.shape)
torchaudio.save("out.wav", waveform[0], 22050)
`],Rs=()=>[`import ChatTTS
import torch
import torchaudio

chat = ChatTTS.Chat()
chat.load(compile=False) # Set to True for better performance

texts = ["PUT YOUR TEXT HERE",]

wavs = chat.infer(texts, )

torchaudio.save("output1.wav", torch.from_numpy(wavs[0]), 24000)`],xr=e=>e.library_name==="yolov10"||e.tags.includes("yolov10")&&(!e.tags.includes("ultralytics")||e.tags.includes("safetensors"))?e.tags.includes("safetensors")?[`from ultralytics import YOLOv10

model = YOLOv10.from_pretrained("${e.id}")
source = 'http://images.cocodataset.org/val2017/000000039769.jpg'
model.predict(source=source, save=True)`]:[`from huggingface_hub import hf_hub_download
from ultralytics import YOLOv10

# pick the weights file from this repo's "Files and versions" tab
weights = hf_hub_download("${e.id}", "<weights>.pt")
model = YOLOv10(weights)
source = 'http://images.cocodataset.org/val2017/000000039769.jpg'
model.predict(source=source, save=True)`]:[`from huggingface_hub import hf_hub_download
from ultralytics import YOLO

# pick the weights file from this repo's "Files and versions" tab
weights = hf_hub_download("${e.id}", "<weights>.pt")
model = YOLO(weights)
source = 'http://images.cocodataset.org/val2017/000000039769.jpg'
model.predict(source=source, save=True)`],Es=e=>[`# Option 1: use with transformers

from transformers import AutoModelForImageSegmentation
birefnet = AutoModelForImageSegmentation.from_pretrained("${e.id}", trust_remote_code=True)
`,`# Option 2: use with BiRefNet

# Install from https://github.com/ZhengPeng7/BiRefNet

from models.birefnet import BiRefNet
model = BiRefNet.from_pretrained("${e.id}")`],Ps=e=>{let t="pip install nobg",o=e.tags.includes("promptable")?'cutout = model.predict(processor, "image.jpg", "prompt")':'cutout = model.predict(processor, "image.jpg")',r=`# Option 1: use via the predict method

from nobg import AutoModel, AutoProcessor

model = AutoModel.from_pretrained("${e.id}").eval()
processor = AutoProcessor.from_pretrained("${e.id}")

${o}`,a=`# Option 2: use the model and processor directly

import torch
from loadimg import load_img
from nobg import AutoModel, AutoProcessor

model = AutoModel.from_pretrained("${e.id}").eval()
processor = AutoProcessor.from_pretrained("${e.id}")

image = load_img("image.jpg").convert("RGB")
inputs = processor(image, return_tensors="pt")

with torch.no_grad():
    outputs = model(pixel_values=inputs["pixel_values"])

alpha = processor.post_process_alpha_matting(outputs, target_sizes=[(image.height, image.width)])[0]
processor.cutout(image, alpha).save("output.png")`;return[t,r,a]},Cs=()=>[`from supertonic import TTS

tts = TTS(auto_download=True)

style = tts.get_voice_style(voice_name="M1")

text = "The train delay was announced at 4:45 PM on Wed, Apr 3, 2024 due to track maintenance."
wav, duration = tts.synthesize(text, voice_style=style)

tts.save_audio(wav, "output.wav")`],Ls=e=>[`from swarmformer import SwarmFormerModel

model = SwarmFormerModel.from_pretrained("${e.id}")
`],Us=e=>[`# Follow installation instructions at https://github.com/PKU-YuanGroup/UniWorld-V1
import torch
from transformers import AutoProcessor
from univa.models.qwen2p5vl.modeling_univa_qwen2p5vl import UnivaQwen2p5VLForConditionalGeneration

model = UnivaQwen2p5VLForConditionalGeneration.from_pretrained(
    "${e.id}",
    torch_dtype=torch.bfloat16,
    attn_implementation="flash_attention_2",
).to("cuda")
processor = AutoProcessor.from_pretrained("${e.id}")
`],eu=e=>[`# Download the model from the Hub
pip install huggingface_hub[hf_xet]

hf download ${e.id} --local-dir ${ae(e.id)}`],tu=e=>[`# Make sure mlx-lm is installed
# pip install --upgrade mlx-lm
# if on a CUDA device, also pip install mlx[cuda]

# Generate text with mlx-lm
from mlx_lm import load, generate

model, tokenizer = load("${e.id}")

prompt = "Once upon a time in"
text = generate(model, tokenizer, prompt=prompt, verbose=True)`],ou=e=>[`# Make sure mlx-lm is installed
# pip install --upgrade mlx-lm

# Generate text with mlx-lm
from mlx_lm import load, generate

model, tokenizer = load("${e.id}")

prompt = "Write a story about Einstein"
messages = [{"role": "user", "content": prompt}]
prompt = tokenizer.apply_chat_template(
    messages, add_generation_prompt=True
)

text = generate(model, tokenizer, prompt=prompt, verbose=True)`],ru=e=>[`# Make sure mlx-vlm is installed
# pip install --upgrade mlx-vlm

from mlx_vlm import load, generate
from mlx_vlm.prompt_utils import apply_chat_template
from mlx_vlm.utils import load_config

# Load the model
model, processor = load("${e.id}")
config = load_config("${e.id}")

# Prepare input
image = ["http://images.cocodataset.org/val2017/000000039769.jpg"]
prompt = "Describe this image."

# Apply chat template
formatted_prompt = apply_chat_template(
    processor, config, prompt, num_images=1
)

# Generate output
output = generate(model, processor, formatted_prompt, image)
print(output)`],Ms=e=>[`from mlxim.model import create_model

model = create_model("${ae(e.id).replace(/-mlxim$/,"")}")`],Os=e=>e.pipeline_tag==="image-text-to-text"?ru(e):e.pipeline_tag==="text-generation"?e.tags.includes("conversational")?ou(e):tu(e):eu(e),Ds=e=>[`from model2vec import StaticModel

model = StaticModel.from_pretrained("${e.id}")

embeddings = model.encode(["It's dangerous to go alone!", "It's a secret to everybody."])
print(embeddings.shape)`],Ns=e=>[`# pip install mblt-model-zoo
from mblt_model_zoo.vision import MBLT_Engine

model = MBLT_Engine(
    model_cls="${ae(e.id)}",
    model_type="DEFAULT",
    model_path="",
    core_mode="global8",
)

try:
    image = model.preprocess("path/to/image.jpg")
    output = model(image)
    result = model.postprocess(output)
finally:
    model.dispose()
`],$s=e=>{let t;e.tags.includes("diffusers")?t=au(e):e.tags.includes("transformers")?t=nu(e):t=iu(e);let o=r=>/^from pruna import PrunaModel/m.test(r)?r:`from pruna import PrunaModel
${r}`;return t=t.map(o),e.tags.includes("pruna_pro-ai")?t.map(r=>r.replace(/^from pruna import /gm,"from pruna_pro import ").replace(/\bPrunaModel\b/g,"PrunaProModel")):t},au=e=>_r(e).map(o=>o.replace(/\b\w*Pipeline\w*\b/g,"PrunaModel").replace(/from diffusers import ([^,\n]*PrunaModel[^,\n]*)/g,"").replace(/from diffusers import ([^,\n]+),?\s*([^,\n]*PrunaModel[^,\n]*)/g,"from diffusers import $1").replace(/from diffusers import\s*(\n|$)/g,"").replace(/from diffusers import PrunaModel/g,"from pruna import PrunaModel").replace(/from diffusers import ([^,\n]+), PrunaModel/g,"from diffusers import $1").replace(/from diffusers import PrunaModel, ([^,\n]+)/g,"from diffusers import $1").replace(/\n\n+/g,`
`).trim()),nu=e=>{let t=us(e),r=vr(e).map(a=>a.replace(/from transformers import pipeline/g,"from pruna import PrunaModel").replace(/pipeline\([^)]*\)/g,`PrunaModel.from_pretrained("${e.id}")`));return t&&(r=r.map(a=>a.replace(new RegExp(`from transformers import ${t}
?`,"g"),"").replace(new RegExp(`${t}.from_pretrained`,"g"),"PrunaModel.from_pretrained").replace(new RegExp(`^.*from.*import.*(, *${t})+.*$`,"gm"),n=>n.replace(new RegExp(`, *${t}`,"g"),"")))),r},iu=e=>[`from pruna import PrunaModel
model = PrunaModel.from_pretrained("${e.id}")
`],js=e=>{let t;return e.tags.includes("automatic-speech-recognition")&&(t=Zm("ASR",e)),t??["# tag did not correspond to a valid NeMo domain."]},qs=e=>{let t=e.tags??[];return t.includes("gguf")||t.includes("onnx")?[]:[`import outetts

enum = outetts.Models("${e.id}".split("/", 1)[1])       # VERSION_1_0_SIZE_1B
cfg  = outetts.ModelConfig.auto_config(enum, outetts.Backend.HF)
tts  = outetts.Interface(cfg)

speaker = tts.load_default_speaker("EN-FEMALE-1-NEUTRAL")
tts.generate(
    outetts.GenerationConfig(
        text="Hello there, how are you doing?",
        speaker=speaker,
    )
).save("output.wav")`]},Bs=e=>[`from pxia import AutoModel

model = AutoModel.from_pretrained("${e.id}")`],Fs=e=>[`from pythae.models import AutoModel

model = AutoModel.load_from_hf_hub("${e.id}")`],Vs=e=>[`# pip install qwen-tts
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel

model = Qwen3TTSModel.from_pretrained(
    "${e.id}",
    device_map="cuda:0",
    dtype=torch.bfloat16,
    attn_implementation="flash_attention_2",
)

wavs, sr = model.generate_custom_voice(
    text="Your text here.",
    language="English",
    speaker="Ryan",
    instruct="Speak in a natural tone.",
)

sf.write("output.wav", wavs[0], sr)`],su=e=>[`from audiocraft.models import MusicGen

model = MusicGen.get_pretrained("${e.id}")

descriptions = ['happy rock', 'energetic EDM', 'sad jazz']
wav = model.generate(descriptions)  # generates 3 samples.`],lu=e=>[`from audiocraft.models import MAGNeT

model = MAGNeT.get_pretrained("${e.id}")

descriptions = ['disco beat', 'energetic EDM', 'funky groove']
wav = model.generate(descriptions)  # generates 3 samples.`],pu=e=>[`from audiocraft.models import AudioGen

model = AudioGen.get_pretrained("${e.id}")
model.set_generation_params(duration=5)  # generate 5 seconds.
descriptions = ['dog barking', 'sirene of an emergency vehicle', 'footsteps in a corridor']
wav = model.generate(descriptions)  # generates 3 samples.`],Hs=e=>[`from anemoi.inference.runners.default import DefaultRunner
from anemoi.inference.config.run import RunConfiguration
# Create Configuration
config = RunConfiguration(checkpoint = {"huggingface":"${e.id}"})
# Load Runner
runner = DefaultRunner(config)`],Xs=e=>e.tags.includes("musicgen")?su(e):e.tags.includes("audiogen")?pu(e):e.tags.includes("magnet")?lu(e):["# Type of model unknown."],Ys=()=>[`# Install CLI with Homebrew on macOS device
brew install whisperkit-cli

# View all available inference options
whisperkit-cli transcribe --help

# Download and run inference using whisper base model
whisperkit-cli transcribe --audio-path /path/to/audio.mp3

# Or use your preferred model variant
whisperkit-cli transcribe --model "large-v3" --model-prefix "distil" --audio-path /path/to/audio.mp3 --verbose`],zs=e=>[`from threedtopia_xl.models import threedtopia_xl

model = threedtopia_xl.from_pretrained("${e.id}")
model.generate(cond="path/to/image.png")`];var Ws=e=>[`# pip install git+https://github.com/Zyphra/Zonos.git
import torchaudio
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict

model = Zonos.from_pretrained("${e.id}", device="cuda")

wav, sr = torchaudio.load("speaker.wav")           # 5-10s reference clip
speaker = model.make_speaker_embedding(wav, sr)

cond  = make_cond_dict(text="Hello, world!", speaker=speaker, language="en-us")
codes = model.generate(model.prepare_conditioning(cond))

audio = model.autoencoder.decode(codes)[0].cpu()
torchaudio.save("sample.wav", audio, model.autoencoder.sampling_rate)
`],Ks=e=>{if(e.id.includes("-mlx")){let t=e.id.includes("-q4")?" -q 4":e.id.includes("-q8")?" -q 8":"";return[`# pip install moshi_mlx
# Run local inference (macOS Apple Silicon)
python -m moshi_mlx.local${t} --hf-repo "${e.id}"

# Or run with web UI
python -m moshi_mlx.local_web${t} --hf-repo "${e.id}"`]}return e.id.includes("-candle")?[`# pip install rustymimi
# Candle backend - see https://github.com/kyutai-labs/moshi
# for Rust installation instructions`]:[`# pip install moshi
# Run the interactive web server
python -m moshi.server --hf-repo "${e.id}"
# Then open https://localhost:8998 in your browser`,`# pip install moshi
import torch
from moshi.models import loaders

# Load checkpoint info from HuggingFace
checkpoint = loaders.CheckpointInfo.from_hf_repo("${e.id}")

# Load the Mimi audio codec
mimi = checkpoint.get_mimi(device="cuda")
mimi.set_num_codebooks(8)

# Encode audio (24kHz, mono)
wav = torch.randn(1, 1, 24000 * 10)  # [batch, channels, samples]
with torch.no_grad():
    codes = mimi.encode(wav.cuda())
    decoded = mimi.decode(codes)`]};var Ar={"aadya-neural":{prettyLabel:"aadya-neural",repoName:"aadya",repoUrl:"https://github.com/manasdutta04/aadya",docsUrl:"https://github.com/manasdutta04/aadya/blob/main/train/README.md",snippets:En,filter:!1,countDownloads:'path:"model.safetensors" OR path:"pytorch_model.bin"'},acestep:{prettyLabel:"ACE-Step",repoName:"ACE-Step",repoUrl:"https://github.com/ace-step/ACE-Step",filter:!1,countDownloads:'path:"ace_step_transformer/config.json"'},"adapter-transformers":{prettyLabel:"Adapters",repoName:"adapters",repoUrl:"https://github.com/Adapter-Hub/adapters",docsUrl:"https://huggingface.co/docs/hub/adapters",snippets:Pn,filter:!0,countDownloads:'path:"adapter_config.json"'},allennlp:{prettyLabel:"AllenNLP",repoName:"AllenNLP",repoUrl:"https://github.com/allenai/allennlp",docsUrl:"https://huggingface.co/docs/hub/allennlp",snippets:Cn,filter:!0},aneforge:{prettyLabel:"ANEForge",repoName:"ANEForge",repoUrl:"https://github.com/sbryngelson/ANEForge",docsUrl:"https://aneforge.readthedocs.io",snippets:ns,filter:!1},anemoi:{prettyLabel:"AnemoI",repoName:"AnemoI",repoUrl:"https://github.com/ecmwf/anemoi-inference",docsUrl:"https://anemoi.readthedocs.io/en/latest/",filter:!1,countDownloads:'path_extension:"ckpt"',snippets:Hs},araclip:{prettyLabel:"AraClip",repoName:"AraClip",repoUrl:"https://huggingface.co/Arabic-Clip/araclip",filter:!1,snippets:Ln},asimov:{prettyLabel:"Asimov",repoName:"Asimov",repoUrl:"https://github.com/menloresearch/humanoid-policy-viewer",snippets:Un,filter:!1,countDownloads:'path:"env.yaml"'},"aviation-ner":{prettyLabel:"Aviation NER",repoName:"Aviation NER",repoUrl:"https://github.com/Boeing/aviation_ner_sdr",docsUrl:"https://github.com/Boeing/aviation_ner_sdr",countDownloads:'path:"gliner_config.json"',filter:!1},asteroid:{prettyLabel:"Asteroid",repoName:"Asteroid",repoUrl:"https://github.com/asteroid-team/asteroid",docsUrl:"https://huggingface.co/docs/hub/asteroid",snippets:Mn,filter:!0,countDownloads:'path:"pytorch_model.bin"'},audiocraft:{prettyLabel:"Audiocraft",repoName:"audiocraft",repoUrl:"https://github.com/facebookresearch/audiocraft",snippets:Xs,filter:!1,countDownloads:'path:"state_dict.bin"'},audioseal:{prettyLabel:"AudioSeal",repoName:"audioseal",repoUrl:"https://github.com/facebookresearch/audioseal",filter:!1,countDownloads:'path_extension:"pth"',snippets:On},"bagel-mot":{prettyLabel:"Bagel",repoName:"Bagel",repoUrl:"https://github.com/ByteDance-Seed/Bagel/",filter:!1,countDownloads:'path:"llm_config.json"'},bboxmaskpose:{prettyLabel:"BBoxMaskPose",repoName:"BBoxMaskPose",repoUrl:"https://github.com/MiraPurkrabek/BBoxMaskPose",filter:!1,countDownloads:'path_extension:"pth"'},ben2:{prettyLabel:"BEN2",repoName:"BEN2",repoUrl:"https://github.com/PramaLLC/BEN2",snippets:Dn,filter:!1},bertopic:{prettyLabel:"BERTopic",repoName:"BERTopic",repoUrl:"https://github.com/MaartenGr/BERTopic",snippets:Nn,filter:!0},big_vision:{prettyLabel:"Big Vision",repoName:"big_vision",repoUrl:"https://github.com/google-research/big_vision",filter:!1,countDownloads:'path_extension:"npz"'},bionemo:{prettyLabel:"BioNeMo",repoName:"BioNeMo",filter:!1,repoUrl:"https://github.com/nvidia/BioNeMo",countDownloads:'path_extension:"ckpt" OR path:"config.json"'},birder:{prettyLabel:"Birder",repoName:"Birder",repoUrl:"https://gitlab.com/birder/birder",filter:!1,countDownloads:'path_extension:"pt"'},birefnet:{prettyLabel:"BiRefNet",repoName:"BiRefNet",repoUrl:"https://github.com/ZhengPeng7/BiRefNet",snippets:Es,filter:!1},bm25s:{prettyLabel:"BM25S",repoName:"bm25s",repoUrl:"https://github.com/xhluca/bm25s",snippets:$n,filter:!1,countDownloads:'path:"params.index.json"'},boltzgen:{prettyLabel:"BoltzGen",repoName:"BoltzGen",repoUrl:"https://github.com/HannesStark/boltzgen",filter:!1,countDownloads:'path:"boltzgen1_diverse.ckpt"'},cancertathomev2:{prettyLabel:"Cancer@HomeV2",repoName:"Cancer@HomeV2",repoUrl:"https://huggingface.co/OpenPeerAI/CancerAtHomeV2",filter:!1,countDownloads:'path:"run.py"'},cartesia_pytorch:{prettyLabel:"Cartesia Pytorch",repoName:"Cartesia Pytorch",repoUrl:"https://github.com/cartesia-ai/cartesia_pytorch",snippets:ti},cartesia_mlx:{prettyLabel:"Cartesia MLX",repoName:"Cartesia MLX",repoUrl:"https://github.com/cartesia-ai/cartesia_mlx",snippets:oi},causilo:{prettyLabel:"Causilo",repoName:"Causilo",repoUrl:"https://github.com/nums-ai/causilo",filter:!1,countDownloads:'path:"classifier/config.json" OR path:"regressor/config.json"'},ccpfn:{prettyLabel:"CCPFN",repoName:"CCPFN",repoUrl:"https://huggingface.co/Layer6/CCPFN",filter:!1,countDownloads:'path_extension:"pt"'},champ:{prettyLabel:"Champ",repoName:"Champ",repoUrl:"https://github.com/fudan-generative-vision/champ",countDownloads:'path:"champ/motion_module.pth"'},chatterbox:{prettyLabel:"Chatterbox",repoName:"Chatterbox",repoUrl:"https://github.com/resemble-ai/chatterbox",snippets:jn,countDownloads:'path:"tokenizer.json"',filter:!1},chaossim:{prettyLabel:"ChaosSIM",repoName:"ChaosSIM",repoUrl:"https://huggingface.co/OpenPeerAI/ChaosSIM/",countDownloads:'path:"ChaosSim.nb"',filter:!1},chat_tts:{prettyLabel:"ChatTTS",repoName:"ChatTTS",repoUrl:"https://github.com/2noise/ChatTTS.git",snippets:Rs,filter:!1,countDownloads:'path:"asset/GPT.pt"'},chexmix:{prettyLabel:"CheXmix",repoName:"CheXmix",repoUrl:"https://github.com/StanfordMIMI/CheXmix",filter:!1,countDownloads:'path_extension:"safetensors"'},"chronos-forecasting":{prettyLabel:"Chronos",repoName:"Chronos",repoUrl:"https://github.com/amazon-science/chronos-forecasting",snippets:qn},clara:{prettyLabel:"Clara",repoName:"Clara",filter:!1,repoUrl:"https://github.com/nvidia/clara",countDownloads:'path_extension:"ckpt" OR path:"config.json"'},clipscope:{prettyLabel:"clipscope",repoName:"clipscope",repoUrl:"https://github.com/Lewington-pitsos/clipscope",filter:!1,countDownloads:'path_extension:"pt"'},"cloud-agents":{prettyLabel:"Cloud Agents",repoName:"Cloud Agents",repoUrl:"https://huggingface.co/OpenPeerAI/Cloud-Agents",filter:!1,countDownloads:'path:"setup.py"'},collectorvision:{prettyLabel:"CollectorVision",repoName:"CollectorVision",repoUrl:"https://github.com/HanClinto/CollectorVision",snippets:Bn,filter:!1,countDownloads:'path_extension:"onnx"'},colipri:{prettyLabel:"COLIPRI",repoName:"COLIPRI",repoUrl:"https://huggingface.co/microsoft/colipri",snippets:Fn,filter:!1,countDownloads:'path_extension:"safetensors"'},cosyvoice:{prettyLabel:"CosyVoice",repoName:"CosyVoice",repoUrl:"https://github.com/FunAudioLLM/CosyVoice",filter:!1,countDownloads:'path_extension:"onnx" OR path_extension:"pt"'},cotracker:{prettyLabel:"CoTracker",repoName:"CoTracker",repoUrl:"https://github.com/facebookresearch/co-tracker",filter:!1,countDownloads:'path_extension:"pth"'},colpali:{prettyLabel:"ColPali",repoName:"ColPali",repoUrl:"https://github.com/ManuelFay/colpali",filter:!1,countDownloads:'path:"adapter_config.json"'},comet:{prettyLabel:"COMET",repoName:"COMET",repoUrl:"https://github.com/Unbabel/COMET/",countDownloads:'path:"hparams.yaml"'},cortiq:{prettyLabel:"cortiq",repoName:"cortiq",repoUrl:"https://github.com/infosave2007/cmf",docsUrl:"https://github.com/infosave2007/cmf/blob/master/docs/CMF_V2_SPEC.md",snippets:Hn,countDownloads:'path_extension:"cmf"'},cosmos:{prettyLabel:"Cosmos",repoName:"Cosmos",repoUrl:"https://github.com/NVIDIA/Cosmos",countDownloads:'path:"config.json" OR path_extension:"pt"'},"cxr-foundation":{prettyLabel:"CXR Foundation",repoName:"cxr-foundation",repoUrl:"https://github.com/google-health/cxr-foundation",snippets:Xn,filter:!1,countDownloads:'path:"precomputed_embeddings/embeddings.npz" OR path:"pax-elixr-b-text/saved_model.pb"'},deepforest:{prettyLabel:"DeepForest",repoName:"deepforest",docsUrl:"https://deepforest.readthedocs.io/en/latest/",repoUrl:"https://github.com/weecology/DeepForest"},"depth-anything-v2":{prettyLabel:"DepthAnythingV2",repoName:"Depth Anything V2",repoUrl:"https://github.com/DepthAnything/Depth-Anything-V2",snippets:Yn,filter:!1,countDownloads:'path_extension:"pth"'},"depth-pro":{prettyLabel:"Depth Pro",repoName:"Depth Pro",repoUrl:"https://github.com/apple/ml-depth-pro",countDownloads:'path_extension:"pt"',snippets:zn,filter:!1},"derm-foundation":{prettyLabel:"Derm Foundation",repoName:"derm-foundation",repoUrl:"https://github.com/google-health/derm-foundation",snippets:Wn,filter:!1,countDownloads:'path:"scin_dataset_precomputed_embeddings.npz" OR path:"saved_model.pb"'},"describe-anything":{prettyLabel:"Describe Anything",repoName:"Describe Anything",repoUrl:"https://github.com/NVlabs/describe-anything",snippets:Jn,filter:!1},"dia-tts":{prettyLabel:"Dia",repoName:"Dia",repoUrl:"https://github.com/nari-labs/dia",snippets:Kn,filter:!1},dia2:{prettyLabel:"Dia2",repoName:"Dia2",repoUrl:"https://github.com/nari-labs/dia2",snippets:Qn,filter:!1},"diff-interpretation-tuning":{prettyLabel:"Diff Interpretation Tuning",repoName:"Diff Interpretation Tuning",repoUrl:"https://github.com/Aviously/diff-interpretation-tuning",filter:!1,countDownloads:'path_extension:"pt"'},diffree:{prettyLabel:"Diffree",repoName:"Diffree",repoUrl:"https://github.com/OpenGVLab/Diffree",filter:!1,countDownloads:'path:"diffree-step=000010999.ckpt"'},diffusers:{prettyLabel:"Diffusers",repoName:"\u{1F917}/diffusers",repoUrl:"https://github.com/huggingface/diffusers",docsUrl:"https://huggingface.co/docs/hub/diffusers",snippets:_r,filter:!0},diffusionkit:{prettyLabel:"DiffusionKit",repoName:"DiffusionKit",repoUrl:"https://github.com/argmaxinc/DiffusionKit",snippets:ei},"docking-at-home":{prettyLabel:"Docking@Home",repoName:"Docking@Home",repoUrl:"https://huggingface.co/OpenPeerAI/DockingAtHOME",filter:!1,countDownloads:'path:"setup.py"'},doctr:{prettyLabel:"docTR",repoName:"doctr",repoUrl:"https://github.com/mindee/doctr"},drinkme:{prettyLabel:"drinkme",repoName:"drinkme",repoUrl:"https://github.com/ninachaubal/drinkme",docsUrl:"https://drinkme.petrichor.wtf",filter:!1,countDownloads:'path_filename:"source-identity" AND path_extension:"json"'},edsnlp:{prettyLabel:"EDS-NLP",repoName:"edsnlp",repoUrl:"https://github.com/aphp/edsnlp",docsUrl:"https://aphp.github.io/edsnlp/latest/",filter:!1,snippets:ri,countDownloads:'path_filename:"config" AND path_extension:"cfg"'},elm:{prettyLabel:"ELM",repoName:"elm",repoUrl:"https://github.com/slicex-ai/elm",filter:!1,countDownloads:'path_filename:"slicex_elm_config" AND path_extension:"json"'},encoderfile:{prettyLabel:"encoderfile",repoName:"encoderfile",repoUrl:"https://github.com/mozilla-ai/encoderfile",filter:!1,countDownloads:'path_extension:"encoderfile"'},ensomi:{prettyLabel:"ensomi",repoName:"ensomi",repoUrl:"https://github.com/ensomi-labs/ensomi-model",filter:!1,countDownloads:'(path_filename:"ensomi-package" AND path_extension:"json") OR path:"checkpoint.pt"'},espnet:{prettyLabel:"ESPnet",repoName:"ESPnet",repoUrl:"https://github.com/espnet/espnet",docsUrl:"https://huggingface.co/docs/hub/espnet",snippets:ai,filter:!0},eupe:{prettyLabel:"EUPE",repoName:"EUPE",repoUrl:"https://github.com/facebookresearch/EUPE",filter:!1,countDownloads:'path_extension:"pt"'},fairseq:{prettyLabel:"Fairseq",repoName:"fairseq",repoUrl:"https://github.com/pytorch/fairseq",snippets:ni,filter:!0},fastai:{prettyLabel:"fastai",repoName:"fastai",repoUrl:"https://github.com/fastai/fastai",docsUrl:"https://huggingface.co/docs/hub/fastai",snippets:es,filter:!0},fastprint:{prettyLabel:"Fast Print",repoName:"Fast Print",repoUrl:"https://huggingface.co/OpenPeerAI/FastPrint",countDownloads:'path_extension:"cs"'},fasttext:{prettyLabel:"fastText",repoName:"fastText",repoUrl:"https://fasttext.cc/",snippets:hs,filter:!0,countDownloads:'path_extension:"bin"'},fixer:{prettyLabel:"Fixer",repoName:"Fixer",repoUrl:"https://github.com/nv-tlabs/Fixer",filter:!1,countDownloads:'path:"pretrained/pretrained_fixer.pkl"'},flair:{prettyLabel:"Flair",repoName:"Flair",repoUrl:"https://github.com/flairNLP/flair",docsUrl:"https://huggingface.co/docs/hub/flair",snippets:ii,filter:!0,countDownloads:'path:"pytorch_model.bin"'},flexray:{prettyLabel:"FleXray",repoName:"FleXray",repoUrl:"https://github.com/VictorButoi/FleXray",filter:!1,countDownloads:'path_extension:"safetensors" OR path_extension:"onnx"',snippets:si},flextab:{prettyLabel:"FlexTab",repoName:"FlexTab",repoUrl:"https://github.com/SAP-samples/flextab",countDownloads:'path_extension:"pt"',snippets:li},fme:{prettyLabel:"Full Model Emulation",repoName:"Full Model Emulation",repoUrl:"https://github.com/ai2cm/ace",docsUrl:"https://ai2-climate-emulator.readthedocs.io/en/latest/",filter:!1,countDownloads:'path_extension:"tar"'},gaussianformer:{prettyLabel:"GaussianFormer",repoName:"GaussianFormer",repoUrl:"https://github.com/SVLwoof/gaussianformer",snippets:pi,filter:!1,countDownloads:'path:"config.json"'},"gemma.cpp":{prettyLabel:"gemma.cpp",repoName:"gemma.cpp",repoUrl:"https://github.com/google/gemma.cpp",filter:!1,countDownloads:'path_extension:"sbs"'},"geometry-crafter":{prettyLabel:"GeometryCrafter",repoName:"GeometryCrafter",repoUrl:"https://github.com/TencentARC/GeometryCrafter",countDownloads:'path:"point_map_vae/diffusion_pytorch_model.safetensors"'},gliformer:{prettyLabel:"GLiFormer",repoName:"GLiFormer",repoUrl:"https://github.com/Knowledgator/GLiFormer",filter:!1,countDownloads:'path:"gliner_config.json"'},gliner:{prettyLabel:"GLiNER",repoName:"GLiNER",repoUrl:"https://github.com/urchade/GLiNER",snippets:ci,filter:!1,countDownloads:'path:"gliner_config.json"'},gliner2:{prettyLabel:"GLiNER2",repoName:"GLiNER2",repoUrl:"https://github.com/fastino-ai/GLiNER2",snippets:di,filter:!1},"glm-tts":{prettyLabel:"GLM-TTS",repoName:"GLM-TTS",repoUrl:"https://github.com/zai-org/GLM-TTS",filter:!1,countDownloads:'path:"flow/flow.pt"'},"glyph-byt5":{prettyLabel:"Glyph-ByT5",repoName:"Glyph-ByT5",repoUrl:"https://github.com/AIGText/Glyph-ByT5",filter:!1,countDownloads:'path:"checkpoints/byt5_model.pt"'},"granite-library":{prettyLabel:"Granite Library",repoName:"mellea",repoUrl:"https://github.com/generative-computing/mellea",filter:!1,countDownloads:'path_filename:"adapter_config" AND path_extension:"json"'},grok:{prettyLabel:"Grok",repoName:"Grok",repoUrl:"https://github.com/xai-org/grok-1",filter:!1,countDownloads:'path:"ckpt/tensor00000_000" OR path:"ckpt-0/tensor00000_000"'},"habibi-tts":{prettyLabel:"Habibi-TTS",repoName:"Habibi-TTS",repoUrl:"https://github.com/SWivid/Habibi-TTS",filter:!1,countDownloads:'path_extension:"safetensors"'},hallo:{prettyLabel:"Hallo",repoName:"Hallo",repoUrl:"https://github.com/fudan-generative-vision/hallo",countDownloads:'path:"hallo/net.pth"'},"minimax-h3":{prettyLabel:"MiniMax H3",repoName:"MiniMax-H3",repoUrl:"https://github.com/MiniMax-AI/MiniMax-H3",docsUrl:"https://huggingface.co/MiniMaxAI/MiniMax-H3",filter:!1,countDownloads:'path_extension:"safetensors" OR path_filename:"model_index" OR path_filename:"config" OR path:"modular_model_index.json"'},mect:{prettyLabel:"MECT",repoName:"AntSpeaker",repoUrl:"https://github.com/ant-research/AntSpeaker",filter:!1,countDownloads:'path_extension:"pt"'},hermes:{prettyLabel:"HERMES",repoName:"HERMES",repoUrl:"https://github.com/LMD0311/HERMES",filter:!1,countDownloads:'path:"ckpt/hermes_final.pth"'},holomotion:{prettyLabel:"HoloMotion",repoName:"HoloMotion",repoUrl:"https://github.com/HorizonRobotics/HoloMotion",filter:!1,countDownloads:'path_extension:"onnx"'},hezar:{prettyLabel:"Hezar",repoName:"Hezar",repoUrl:"https://github.com/hezarai/hezar",docsUrl:"https://hezarai.github.io/hezar",countDownloads:'path:"model_config.yaml" OR path:"embedding/embedding_config.yaml"'},htrflow:{prettyLabel:"HTRflow",repoName:"HTRflow",repoUrl:"https://github.com/AI-Riksarkivet/htrflow",docsUrl:"https://ai-riksarkivet.github.io/htrflow",snippets:ui},"hunyuan-dit":{prettyLabel:"HunyuanDiT",repoName:"HunyuanDiT",repoUrl:"https://github.com/Tencent/HunyuanDiT",countDownloads:'path:"pytorch_model_ema.pt" OR path:"pytorch_model_distill.pt"'},"hunyuan3d-2":{prettyLabel:"Hunyuan3D-2",repoName:"Hunyuan3D-2",repoUrl:"https://github.com/Tencent/Hunyuan3D-2",countDownloads:'path_filename:"model_index" OR path_filename:"config"'},"hunyuanworld-voyager":{prettyLabel:"HunyuanWorld-voyager",repoName:"HunyuanWorld-voyager",repoUrl:"https://github.com/Tencent-Hunyuan/HunyuanWorld-Voyager"},"hy-worldplay":{prettyLabel:"HY-WorldPlay",repoName:"HY-WorldPlay",repoUrl:"https://github.com/Tencent-Hunyuan/HY-WorldPlay",filter:!1,countDownloads:'path_extension:"json"'},"hy-world-2":{prettyLabel:"HY-World-2.0",repoName:"HY-World-2.0",repoUrl:"https://github.com/Tencent-Hunyuan/HY-World-2.0",filter:!1,countDownloads:'path_extension:"json"'},"image-matching-models":{prettyLabel:"Image Matching Models",repoName:"Image Matching Models",repoUrl:"https://github.com/alexstoken/image-matching-models",filter:!1,countDownloads:'path_extension:"safetensors"'},imstoucan:{prettyLabel:"IMS Toucan",repoName:"IMS-Toucan",repoUrl:"https://github.com/DigitalPhonetics/IMS-Toucan",countDownloads:'path:"embedding_gan.pt" OR path:"Vocoder.pt" OR path:"ToucanTTS.pt"'},"index-tts":{prettyLabel:"IndexTTS",repoName:"IndexTTS",repoUrl:"https://github.com/index-tts/index-tts",snippets:mi,filter:!1},infinitetalk:{prettyLabel:"InfiniteTalk",repoName:"InfiniteTalk",repoUrl:"https://github.com/MeiGen-AI/InfiniteTalk",filter:!1,countDownloads:'path_extension:"safetensors"'},"infinite-you":{prettyLabel:"InfiniteYou",repoName:"InfiniteYou",repoUrl:"https://github.com/bytedance/InfiniteYou",filter:!1,countDownloads:'path:"infu_flux_v1.0/sim_stage1/image_proj_model.bin" OR path:"infu_flux_v1.0/aes_stage2/image_proj_model.bin"'},intellifold:{prettyLabel:"IntelliFold",repoName:"IntelliFold",repoUrl:"https://github.com/IntelliGen-AI/IntelliFold",filter:!1,countDownloads:'path_extension:"pt" OR path_extension:"zst"'},"ising-decoding":{prettyLabel:"Ising Decoding",repoName:"Ising-Decoding",repoUrl:"https://github.com/NVIDIA/Ising-Decoding",filter:!1,countDownloads:'path_extension:"safetensors"'},"jev-style":{prettyLabel:"jev-style",repoName:"jev-style",repoUrl:"https://github.com/lawrence3699/jev-style",snippets:fi,filter:!1,countDownloads:'path_extension:"gguf" OR (path_filename:"config" AND path_extension:"json")'},keras:{prettyLabel:"Keras",repoName:"Keras",repoUrl:"https://github.com/keras-team/keras",docsUrl:"https://huggingface.co/docs/hub/keras",snippets:gi,filter:!0,countDownloads:'path:"config.json" OR path_extension:"keras"'},"tf-keras":{prettyLabel:"TF-Keras",repoName:"TF-Keras",repoUrl:"https://github.com/keras-team/tf-keras",docsUrl:"https://huggingface.co/docs/hub/tf-keras",snippets:Ri,countDownloads:'path:"saved_model.pb"'},"keras-hub":{prettyLabel:"KerasHub",repoName:"KerasHub",repoUrl:"https://github.com/keras-team/keras-hub",docsUrl:"https://keras.io/keras_hub/",snippets:yi,filter:!0},zeromodels:{prettyLabel:"ZeroModels",repoName:"ZeroModels",repoUrl:"https://github.com/IMvision12/ZeroModels",docsUrl:"https://imvision12.github.io/ZeroModels/",snippets:hi,countDownloads:'path:"model.weights.h5" OR path:"model.weights.json"',filter:!1},kernels:{prettyLabel:"Kernels",repoName:"Kernels",repoUrl:"https://github.com/huggingface/kernels",docsUrl:"https://huggingface.co/docs/kernels",snippets:bi,countDownloads:'path_filename:"_ops" AND path_extension:"py"'},"kimi-audio":{prettyLabel:"KimiAudio",repoName:"KimiAudio",repoUrl:"https://github.com/MoonshotAI/Kimi-Audio",snippets:wi,filter:!1},kittentts:{prettyLabel:"KittenTTS",repoName:"KittenTTS",repoUrl:"https://github.com/KittenML/KittenTTS",snippets:_i},kronos:{prettyLabel:"KRONOS",repoName:"KRONOS",repoUrl:"https://github.com/mahmoodlab/KRONOS",filter:!1,countDownloads:'path_extension:"pt"'},k2:{prettyLabel:"K2",repoName:"k2",repoUrl:"https://github.com/k2-fsa/k2"},"lyra-2.0":{prettyLabel:"Lyra-2.0",repoName:"Lyra-2.0",repoUrl:"https://github.com/nv-tlabs/lyra",filter:!1,countDownloads:'path:"checkpoints/image_encoder/model.pth"'},lagernvs:{prettyLabel:"LagerNVS",repoName:"LagerNVS",repoUrl:"https://github.com/facebookresearch/lagernvs",filter:!1,countDownloads:'path_extension:"pt"'},laya:{prettyLabel:"Laya",repoName:"Laya",repoUrl:"https://github.com/NandhaKishorM/laya",filter:!1,countDownloads:'path:"rl_agent_config.json"'},ltx:{prettyLabel:"LTX-2",repoName:"LTX-2",repoUrl:"https://github.com/Lightricks/LTX-2",docsUrl:"https://github.com/Lightricks/LTX-2",snippets:Ai,filter:!1,countDownloads:'path_extension:"safetensors"'},"lightning-ir":{prettyLabel:"Lightning IR",repoName:"Lightning IR",repoUrl:"https://github.com/webis-de/lightning-ir",snippets:ki},litert:{prettyLabel:"LiteRT",repoName:"LiteRT",repoUrl:"https://github.com/google-ai-edge/LiteRT",filter:!1,countDownloads:'path_extension:"tflite"'},"litert-lm":{prettyLabel:"LiteRT-LM",repoName:"LiteRT-LM",repoUrl:"https://github.com/google-ai-edge/LiteRT-LM",snippets:Si,filter:!1,countDownloads:'path_extension:"litertlm" OR path_extension:"task"'},lerobot:{prettyLabel:"LeRobot",repoName:"LeRobot",repoUrl:"https://github.com/huggingface/lerobot",docsUrl:"https://huggingface.co/docs/lerobot",filter:!1,snippets:Ti},lightglue:{prettyLabel:"LightGlue",repoName:"LightGlue",repoUrl:"https://github.com/cvg/LightGlue",filter:!1,countDownloads:'path_extension:"pth" OR path:"config.json"'},liveportrait:{prettyLabel:"LivePortrait",repoName:"LivePortrait",repoUrl:"https://github.com/KwaiVGI/LivePortrait",filter:!1,countDownloads:'path:"liveportrait/landmark.onnx"'},"longcat-video-avatar-1.5":{prettyLabel:"LongCat-Video-Avatar 1.5",repoName:"LongCat-Video-Avatar 1.5",repoUrl:"https://github.com/meituan-longcat/LongCat-Video",filter:!1},"llama-cpp-python":{prettyLabel:"llama-cpp-python",repoName:"llama-cpp-python",repoUrl:"https://github.com/abetlen/llama-cpp-python",snippets:Ii},"mini-omni2":{prettyLabel:"Mini-Omni2",repoName:"Mini-Omni2",repoUrl:"https://github.com/gpt-omni/mini-omni2",countDownloads:'path:"model_config.yaml"'},mindspore:{prettyLabel:"MindSpore",repoName:"mindspore",repoUrl:"https://github.com/mindspore-ai/mindspore"},"magi-1":{prettyLabel:"MAGI-1",repoName:"MAGI-1",repoUrl:"https://github.com/SandAI-org/MAGI-1",countDownloads:'path:"ckpt/vae/config.json"'},"magenta-realtime":{prettyLabel:"Magenta RT",repoName:"Magenta RT",repoUrl:"https://github.com/magenta/magenta-realtime",countDownloads:'path:"checkpoints/llm_base_x4286_c1860k.tar" OR path:"checkpoints/llm_large_x3047_c1860k.tar" OR path:"checkpoints/llm_large_x3047_c1860k/checkpoint"'},"magenta-realtime-2":{prettyLabel:"Magenta RT 2",repoName:"Magenta RT 2",repoUrl:"https://github.com/magenta/magenta-realtime",countDownloads:'path:"models/mrt2_base/mrt2_base.mlxfn" OR path:"models/mrt2_small/mrt2_small.mlxfn" OR path:"checkpoints/mrt2_base.safetensors" OR path:"checkpoints/mrt2_small.safetensors"'},"mamba-ssm":{prettyLabel:"MambaSSM",repoName:"MambaSSM",repoUrl:"https://github.com/state-spaces/mamba",filter:!1,snippets:Ei},"manas-1":{prettyLabel:"MANAS-1",repoName:"MANAS-1",repoUrl:"https://github.com/NeurodxAI/manas-1",countDownloads:'path_extension:"pt"'},"mars5-tts":{prettyLabel:"MARS5-TTS",repoName:"MARS5-TTS",repoUrl:"https://github.com/Camb-ai/MARS5-TTS",filter:!1,countDownloads:'path:"mars5_ar.safetensors"',snippets:Pi},matanyone:{prettyLabel:"MatAnyone",repoName:"MatAnyone",repoUrl:"https://github.com/pq-yang/MatAnyone",snippets:Ci,filter:!1},memra:{prettyLabel:"memra",repoName:"memra",repoUrl:"https://github.com/avifenesh/memra",snippets:Li,filter:!1},"mesh-anything":{prettyLabel:"MeshAnything",repoName:"MeshAnything",repoUrl:"https://github.com/buaacyw/MeshAnything",filter:!1,countDownloads:'path:"MeshAnything_350m.pth"',snippets:Ui},merlin:{prettyLabel:"Merlin",repoName:"Merlin",repoUrl:"https://github.com/StanfordMIMI/Merlin",filter:!1,countDownloads:'path_extension:"pt"'},medvae:{prettyLabel:"MedVAE",repoName:"MedVAE",repoUrl:"https://github.com/StanfordMIMI/MedVAE",filter:!1,countDownloads:'path_extension:"ckpt"'},mflux:{prettyLabel:"mflux",repoName:"mflux",repoUrl:"https://github.com/filipstrand/mflux",filter:!1,countDownloads:'path_extension:"safetensors"'},microduck:{prettyLabel:"Microduck",repoName:"Microduck",repoUrl:"https://github.com/pollen-robotics/microduck",snippets:Mi,filter:!0,countDownloads:'path_extension:"onnx"'},mitie:{prettyLabel:"MITIE",repoName:"MITIE",repoUrl:"https://github.com/mit-nlp/MITIE",countDownloads:'path_filename:"total_word_feature_extractor"'},"ml-agents":{prettyLabel:"ml-agents",repoName:"ml-agents",repoUrl:"https://github.com/Unity-Technologies/ml-agents",docsUrl:"https://huggingface.co/docs/hub/ml-agents",snippets:bs,filter:!0,countDownloads:'path_extension:"onnx"'},"ml-sharp":{prettyLabel:"Sharp",repoName:"Sharp",repoUrl:"https://github.com/apple/ml-sharp",filter:!1,countDownloads:'path_extension:"pt"'},mlx:{prettyLabel:"MLX",repoName:"MLX",repoUrl:"https://github.com/ml-explore/mlx-examples/tree/main",snippets:Os,filter:!0},"mlx-image":{prettyLabel:"mlx-image",repoName:"mlx-image",repoUrl:"https://github.com/riccardomusmeci/mlx-image",docsUrl:"https://huggingface.co/docs/hub/mlx-image",snippets:Ms,filter:!1,countDownloads:'path:"model.safetensors"'},"mlc-llm":{prettyLabel:"MLC-LLM",repoName:"MLC-LLM",repoUrl:"https://github.com/mlc-ai/mlc-llm",docsUrl:"https://llm.mlc.ai/docs/",filter:!1,countDownloads:'path:"mlc-chat-config.json"'},model2vec:{prettyLabel:"Model2Vec",repoName:"model2vec",repoUrl:"https://github.com/MinishLab/model2vec",snippets:Ds,filter:!1},mobilint:{prettyLabel:"Mobilint",repoName:"mblt-model-zoo",repoUrl:"https://github.com/mobilint/mblt-model-zoo",docsUrl:"https://docs.mobilint.com",countDownloads:'path:"config.json" OR path_extension:"mxq"',snippets:Ns,filter:!1},"montreal-forced-aligner":{prettyLabel:"Montreal Forced Aligner",repoName:"Montreal Forced Aligner",repoUrl:"https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner",docsUrl:"https://montreal-forced-aligner.readthedocs.io",filter:!1,countDownloads:'path:"acoustic/final.mdl" OR path_extension:"zip"'},moshi:{prettyLabel:"Moshi",repoName:"Moshi",repoUrl:"https://github.com/kyutai-labs/moshi",snippets:Ks,filter:!1,countDownloads:'path:"tokenizer-e351c8d8-checkpoint125.safetensors"'},mtvcraft:{prettyLabel:"MTVCraft",repoName:"MTVCraft",repoUrl:"https://github.com/baaivision/MTVCraft",filter:!1,countDownloads:'path:"vae/3d-vae.pt"'},multimolecule:{prettyLabel:"MultiMolecule",repoName:"MultiMolecule",repoUrl:"https://github.com/MultiMolecule/multimolecule",docsUrl:"https://multimolecule.danling.org",snippets:Oi,filter:!1},nemo:{prettyLabel:"NeMo",repoName:"NeMo",repoUrl:"https://github.com/NVIDIA/NeMo",snippets:js,filter:!0,countDownloads:'path_extension:"nemo" OR path:"model_config.yaml" OR path_extension:"json"'},ninfer:{prettyLabel:"NInfer",repoName:"NInfer",repoUrl:"https://github.com/Neroued/ninfer",filter:!1,countDownloads:'path_extension:"ninfer"'},nobg:{prettyLabel:"nobg",repoName:"nobg",repoUrl:"https://github.com/feyninc/nobg",snippets:Ps,filter:!1},"nv-medtech":{prettyLabel:"NV-MedTech",repoName:"NV-MedTech",filter:!1,repoUrl:"https://github.com/nvidia-medtech",countDownloads:'path_extension:"pt" OR path_extension:"safetensors" OR path:"config.json"'},"open-oasis":{prettyLabel:"open-oasis",repoName:"open-oasis",repoUrl:"https://github.com/etched-ai/open-oasis",countDownloads:'path:"oasis500m.safetensors"'},open_clip:{prettyLabel:"OpenCLIP",repoName:"OpenCLIP",repoUrl:"https://github.com/mlfoundations/open_clip",snippets:Di,filter:!0,countDownloads:`path:"open_clip_model.safetensors"
			OR path:"model.safetensors"
			OR path:"open_clip_pytorch_model.bin"
			OR path:"pytorch_model.bin"`},openasr:{prettyLabel:"OpenASR",repoName:"OpenASR",repoUrl:"https://github.com/QuintinShaw/openasr",docsUrl:"https://github.com/QuintinShaw/openasr/blob/main/docs/DOCS_INDEX.md",snippets:Ni,filter:!1,countDownloads:'path_extension:"oasr"'},opendde:{prettyLabel:"OpenDDE",repoName:"OpenDDE",repoUrl:"https://github.com/aurekaresearch/OpenDDE",docsUrl:"https://huggingface.co/aurekaresearch/OpenDDE/blob/main/docs/inference_instructions.md",snippets:$i,filter:!1,countDownloads:'path_extension:"pt"'},openpeerllm:{prettyLabel:"OpenPeerLLM",repoName:"OpenPeerLLM",repoUrl:"https://huggingface.co/openpeerai/openpeerllm",docsUrl:"https://huggingface.co/OpenPeerAI/OpenPeerLLM/blob/main/README.md",countDownloads:'path:".meta-huggingface.json"',filter:!1},"open-sora":{prettyLabel:"Open-Sora",repoName:"Open-Sora",repoUrl:"https://github.com/hpcaitech/Open-Sora",filter:!1,countDownloads:'path:"Open_Sora_v2.safetensors"'},outetts:{prettyLabel:"OuteTTS",repoName:"OuteTTS",repoUrl:"https://github.com/edwko/OuteTTS",snippets:qs,filter:!1},paddlenlp:{prettyLabel:"paddlenlp",repoName:"PaddleNLP",repoUrl:"https://github.com/PaddlePaddle/PaddleNLP",docsUrl:"https://huggingface.co/docs/hub/paddlenlp",snippets:ji,filter:!0,countDownloads:'path:"model_config.json"'},PaddleOCR:{prettyLabel:"PaddleOCR",repoName:"PaddleOCR",repoUrl:"https://github.com/PaddlePaddle/PaddleOCR",docsUrl:"https://www.paddleocr.ai/",snippets:qi,filter:!0,countDownloads:'path_extension:"safetensors" OR path:"inference.pdiparams" OR path:"inference.onnx"'},peft:{prettyLabel:"PEFT",repoName:"PEFT",repoUrl:"https://github.com/huggingface/peft",snippets:gs,filter:!0,countDownloads:'path:"adapter_config.json"'},"perception-encoder":{prettyLabel:"PerceptionEncoder",repoName:"PerceptionModels",repoUrl:"https://github.com/facebookresearch/perception_models",filter:!1,snippets:Bi,countDownloads:'path_extension:"pt"'},"phantom-wan":{prettyLabel:"Phantom",repoName:"Phantom",repoUrl:"https://github.com/Phantom-video/Phantom",snippets:Fi,filter:!1,countDownloads:'path_extension:"pth"'},piper:{prettyLabel:"Piper",repoName:"Piper",repoUrl:"https://github.com/OHF-Voice/piper1-gpl",filter:!1,countDownloads:'path_extension:"onnx" OR path_extension:"ckpt"'},"pocket-tts":{prettyLabel:"Pocket-TTS",repoName:"PocketTTS",repoUrl:"https://github.com/kyutai-labs/pocket-tts",snippets:Vi,filter:!1,countDownloads:'path:"tts_b6369a24.safetensors"'},"pruna-ai":{prettyLabel:"Pruna AI",repoName:"Pruna AI",repoUrl:"https://github.com/PrunaAI/pruna",snippets:$s,docsUrl:"https://docs.pruna.ai"},pxia:{prettyLabel:"pxia",repoName:"pxia",repoUrl:"https://github.com/not-lain/pxia",snippets:Bs,filter:!1},"pyannote-audio":{prettyLabel:"pyannote.audio",repoName:"pyannote-audio",repoUrl:"https://github.com/pyannote/pyannote-audio",snippets:Hi,filter:!0},"py-feat":{prettyLabel:"Py-Feat",repoName:"Py-Feat",repoUrl:"https://github.com/cosanlab/py-feat",docsUrl:"https://py-feat.org/",filter:!1},pythae:{prettyLabel:"pythae",repoName:"pythae",repoUrl:"https://github.com/clementchadebec/benchmark_VAE",snippets:Fs,filter:!1},quantumpeer:{prettyLabel:"QuantumPeer",repoName:"QuantumPeer",repoUrl:"https://github.com/OpenPeer-AI/QuantumPeer",filter:!1,countDownloads:'path_extension:"setup.py"'},qwen3_tts:{prettyLabel:"Qwen3-TTS",repoName:"Qwen3-TTS",repoUrl:"https://github.com/QwenLM/Qwen3-TTS",snippets:Vs,filter:!1},recurrentgemma:{prettyLabel:"RecurrentGemma",repoName:"recurrentgemma",repoUrl:"https://github.com/google-deepmind/recurrentgemma",filter:!1,countDownloads:'path:"tokenizer.model"'},relik:{prettyLabel:"Relik",repoName:"Relik",repoUrl:"https://github.com/SapienzaNLP/relik",snippets:Xi,filter:!1},refiners:{prettyLabel:"Refiners",repoName:"Refiners",repoUrl:"https://github.com/finegrain-ai/refiners",docsUrl:"https://refine.rs/",filter:!1,countDownloads:'path:"model.safetensors"'},renderformer:{prettyLabel:"RenderFormer",repoName:"RenderFormer",repoUrl:"https://github.com/microsoft/renderformer",snippets:Yi,filter:!1},reverb:{prettyLabel:"Reverb",repoName:"Reverb",repoUrl:"https://github.com/revdotcom/reverb",filter:!1},rkllm:{prettyLabel:"RKLLM",repoName:"RKLLM",repoUrl:"https://github.com/airockchip/rknn-llm",countDownloads:'path_extension:"rkllm"'},"robo-orchard-lab":{prettyLabel:"RoboOrchardLab",repoName:"RoboOrchardLab",repoUrl:"https://github.com/HorizonRobotics/RoboOrchardLab",filter:!1,countDownloads:'path_extension:"safetensors"'},"routee-powertrain":{prettyLabel:"RouteE-Powertrain",repoName:"RouteE-Powertrain",repoUrl:"https://github.com/NatLabRockies/routee-powertrain",docsUrl:"https://natlabrockies.github.io/routee-powertrain/",snippets:zi,filter:!1,countDownloads:'path_extension:"onnx" OR path_extension:"joblib"'},rwkv:{prettyLabel:"RWKV",repoName:"RWKV-LM",repoUrl:"https://github.com/BlinkDL/RWKV-LM",docsUrl:"https://rwkv.com/",filter:!1,countDownloads:'path_extension:"pth"'},saelens:{prettyLabel:"SAELens",repoName:"SAELens",repoUrl:"https://github.com/jbloomAus/SAELens",snippets:Qi,filter:!1},"sage-music":{prettyLabel:"SAGE",repoName:"SAGE",repoUrl:"https://github.com/francescobrigante/SAGE",filter:!1,countDownloads:'path_extension:"ckpt"'},"scail-2":{prettyLabel:"SCAIL-2",repoName:"SCAIL-2",repoUrl:"https://github.com/zai-org/SCAIL-2",filter:!1,countDownloads:'path:"model/1/fsdp2_rank_0000_checkpoint.pt"'},sam2:{prettyLabel:"sam2",repoName:"sam2",repoUrl:"https://github.com/facebookresearch/segment-anything-2",filter:!1,snippets:ts,countDownloads:'path_extension:"pt"'},"sam-3d-body":{prettyLabel:"SAM 3D Body",repoName:"SAM 3D Body",repoUrl:"https://github.com/facebookresearch/sam-3d-body",filter:!1,snippets:rs,countDownloads:'path:"model_config.yaml"'},"sam-3d-objects":{prettyLabel:"SAM 3D Objects",repoName:"SAM 3D Objects",repoUrl:"https://github.com/facebookresearch/sam-3d-objects",filter:!1,snippets:os,countDownloads:'path:"checkpoints/pipeline.yaml"'},same:{prettyLabel:"SAME",repoName:"SAME",repoUrl:"https://github.com/GengzeZhou/SAME",filter:!1,countDownloads:'path:"ckpt/SAME.pt" OR path:"pretrain/Attnq_pretrained_ckpt.pt"'},"sample-factory":{prettyLabel:"sample-factory",repoName:"sample-factory",repoUrl:"https://github.com/alex-petrenko/sample-factory",docsUrl:"https://huggingface.co/docs/hub/sample-factory",snippets:as,filter:!0,countDownloads:'path:"cfg.json"'},"sap-rpt-1-oss":{prettyLabel:"sap-rpt-1-oss",repoName:"sap-rpt-1-oss",repoUrl:"https://github.com/SAP-samples/sap-rpt-1-oss",countDownloads:'path_extension:"pt"',snippets:Vn},sapiens:{prettyLabel:"sapiens",repoName:"sapiens",repoUrl:"https://github.com/facebookresearch/sapiens",filter:!1,countDownloads:'path_extension:"pt2" OR path_extension:"pth" OR path_extension:"onnx"'},sapiens2:{prettyLabel:"sapiens2",repoName:"sapiens2",repoUrl:"https://github.com/facebookresearch/sapiens2",filter:!1,countDownloads:'path_extension:"safetensors"'},seedvr:{prettyLabel:"SeedVR",repoName:"SeedVR",repoUrl:"https://github.com/ByteDance-Seed/SeedVR",filter:!1,countDownloads:'path_extension:"pth"'},"self-forcing":{prettyLabel:"SelfForcing",repoName:"SelfForcing",repoUrl:"https://github.com/guandeh17/Self-Forcing",filter:!1,countDownloads:'path_extension:"pt"'},"sentence-transformers":{prettyLabel:"sentence-transformers",repoName:"sentence-transformers",repoUrl:"https://github.com/UKPLab/sentence-transformers",docsUrl:"https://huggingface.co/docs/hub/sentence-transformers",snippets:is,filter:!0},setfit:{prettyLabel:"setfit",repoName:"setfit",repoUrl:"https://github.com/huggingface/setfit",docsUrl:"https://huggingface.co/docs/hub/setfit",snippets:ss,filter:!0},shadow:{prettyLabel:"Shadow",repoName:"Shadow",repoUrl:"https://github.com/QLNI/SHADOW-250M-Instruct",filter:!1,countDownloads:'path_extension:"shdw"'},sklearn:{prettyLabel:"Scikit-learn",repoName:"Scikit-learn",repoUrl:"https://github.com/scikit-learn/scikit-learn",snippets:Gi,filter:!0,countDownloads:'path:"sklearn_model.joblib"'},spacy:{prettyLabel:"spaCy",repoName:"spaCy",repoUrl:"https://github.com/explosion/spaCy",docsUrl:"https://huggingface.co/docs/hub/spacy",snippets:ls,filter:!0,countDownloads:'path_extension:"whl"'},"span-marker":{prettyLabel:"SpanMarker",repoName:"SpanMarkerNER",repoUrl:"https://github.com/tomaarsen/SpanMarkerNER",docsUrl:"https://huggingface.co/docs/hub/span_marker",snippets:ps,filter:!0},speechbrain:{prettyLabel:"speechbrain",repoName:"speechbrain",repoUrl:"https://github.com/speechbrain/speechbrain",docsUrl:"https://huggingface.co/docs/hub/speechbrain",snippets:ds,filter:!0,countDownloads:'path:"hyperparams.yaml"'},"ssr-speech":{prettyLabel:"SSR-Speech",repoName:"SSR-Speech",repoUrl:"https://github.com/WangHelin1997/SSR-Speech",filter:!1,countDownloads:'path_extension:".pth"'},"stable-audio-3":{prettyLabel:"Stable Audio 3",repoName:"stable-audio-3",repoUrl:"https://github.com/Stability-AI/stable-audio-3",filter:!1,countDownloads:'path:"model_config.json"'},"stable-audio-tools":{prettyLabel:"Stable Audio Tools",repoName:"stable-audio-tools",repoUrl:"https://github.com/Stability-AI/stable-audio-tools.git",filter:!1,countDownloads:'path:"model.safetensors"',snippets:Zi},monkeyocr:{prettyLabel:"MonkeyOCR",repoName:"monkeyocr",repoUrl:"https://github.com/Yuliang-Liu/MonkeyOCR",filter:!1,countDownloads:'path:"Recognition/config.json"'},"diffusion-single-file":{prettyLabel:"Diffusion Single File",repoName:"diffusion-single-file",repoUrl:"https://github.com/comfyanonymous/ComfyUI",filter:!1,countDownloads:'path_extension:"safetensors"'},"seed-story":{prettyLabel:"SEED-Story",repoName:"SEED-Story",repoUrl:"https://github.com/TencentARC/SEED-Story",filter:!1,countDownloads:'path:"cvlm_llama2_tokenizer/tokenizer.model"',snippets:Ji},skala:{prettyLabel:"Skala",repoName:"Skala",repoUrl:"https://github.com/microsoft/skala",filter:!1,countDownloads:'path_extension:"fun"'},soloaudio:{prettyLabel:"SoloAudio",repoName:"SoloAudio",repoUrl:"https://github.com/WangHelin1997/SoloAudio",filter:!1,countDownloads:'path:"soloaudio_v2.pt"'},songbloom:{prettyLabel:"SongBloom",repoName:"SongBloom",repoUrl:"https://github.com/Cypress-Yang/SongBloom",filter:!1,countDownloads:'path_extension:"pt"'},"stable-baselines3":{prettyLabel:"stable-baselines3",repoName:"stable-baselines3",repoUrl:"https://github.com/huggingface/huggingface_sb3",docsUrl:"https://huggingface.co/docs/hub/stable-baselines3",snippets:ys,filter:!0,countDownloads:'path_extension:"zip"'},stanza:{prettyLabel:"Stanza",repoName:"stanza",repoUrl:"https://github.com/stanfordnlp/stanza",docsUrl:"https://huggingface.co/docs/hub/stanza",snippets:cs,filter:!0,countDownloads:'path:"models/default.zip"'},supertonic:{prettyLabel:"Supertonic",repoName:"Supertonic",repoUrl:"https://github.com/supertone-inc/supertonic",snippets:Cs,filter:!1},swarmformer:{prettyLabel:"SwarmFormer",repoName:"SwarmFormer",repoUrl:"https://github.com/takara-ai/SwarmFormer",snippets:Ls,filter:!1},"synthefy-migas":{prettyLabel:"Migas",repoName:"Migas",repoUrl:"https://github.com/Synthefy/synthefy-migas",filter:!1,countDownloads:'path:"model.pt"'},"f5-tts":{prettyLabel:"F5-TTS",repoName:"F5-TTS",repoUrl:"https://github.com/SWivid/F5-TTS",filter:!1,countDownloads:'path_extension:"safetensors" OR path_extension:"pt"'},genmo:{prettyLabel:"Genmo",repoName:"Genmo",repoUrl:"https://github.com/genmoai/models",filter:!1,countDownloads:'path:"vae_stats.json"'},"tencent-song-generation":{prettyLabel:"SongGeneration",repoName:"SongGeneration",repoUrl:"https://github.com/tencent-ailab/songgeneration",filter:!1,countDownloads:'path:"ckpt/songgeneration_base/model.pt"'},tensorflowtts:{prettyLabel:"TensorFlowTTS",repoName:"TensorFlowTTS",repoUrl:"https://github.com/TensorSpeech/TensorFlowTTS",snippets:Wi},tensorrt:{prettyLabel:"TensorRT",repoName:"TensorRT",repoUrl:"https://github.com/NVIDIA/TensorRT",countDownloads:'path_extension:"onnx"'},tabpfn:{prettyLabel:"TabPFN",repoName:"TabPFN",repoUrl:"https://github.com/PriorLabs/TabPFN"},terratorch:{prettyLabel:"TerraTorch",repoName:"TerraTorch",repoUrl:"https://github.com/IBM/terratorch",docsUrl:"https://ibm.github.io/terratorch/",filter:!1,countDownloads:'path_extension:"pt" OR path_extension:"ckpt"',snippets:ms},"tic-clip":{prettyLabel:"TiC-CLIP",repoName:"TiC-CLIP",repoUrl:"https://github.com/apple/ml-tic-clip",filter:!1,countDownloads:'path_extension:"pt" AND path_prefix:"checkpoints/"'},timesfm:{prettyLabel:"TimesFM",repoName:"timesfm",repoUrl:"https://github.com/google-research/timesfm",filter:!1,countDownloads:'path:"config.json" OR path:"torch_model.ckpt" OR path:"checkpoints/checkpoint_1100000/state/checkpoint" OR path:"checkpoints/checkpoint_2150000/state/checkpoint"'},"timee-ts":{prettyLabel:"timee-ts",repoName:"timee-ts",repoUrl:"https://github.com/liamsbhoo/timee",filter:!1,countDownloads:'path:"model.safetensors"'},timm:{prettyLabel:"timm",repoName:"pytorch-image-models",repoUrl:"https://github.com/rwightman/pytorch-image-models",docsUrl:"https://huggingface.co/docs/hub/timm",snippets:Ki,filter:!0,countDownloads:'path:"pytorch_model.bin" OR path:"model.safetensors"'},tirex:{prettyLabel:"TiRex",repoName:"TiRex",repoUrl:"https://github.com/NX-AI/tirex",countDownloads:'path_extension:"ckpt"'},"tirex-2":{prettyLabel:"TiRex-2",repoName:"TiRex-2",repoUrl:"https://github.com/NX-AI/tirex-2",countDownloads:'path:"model-config.yaml"'},torchgeo:{prettyLabel:"TorchGeo",repoName:"TorchGeo",repoUrl:"https://github.com/microsoft/torchgeo",docsUrl:"https://torchgeo.readthedocs.io/",filter:!1,countDownloads:'path_extension:"pt" OR path_extension:"pth"'},transformers:{prettyLabel:"Transformers",repoName:"\u{1F917}/transformers",repoUrl:"https://github.com/huggingface/transformers",docsUrl:"https://huggingface.co/docs/hub/transformers",snippets:vr,filter:!0},"transformers.js":{prettyLabel:"Transformers.js",repoName:"transformers.js",repoUrl:"https://github.com/huggingface/transformers.js",docsUrl:"https://huggingface.co/docs/hub/transformers-js",snippets:fs,filter:!0},trellis:{prettyLabel:"Trellis",repoName:"Trellis",repoUrl:"https://github.com/microsoft/TRELLIS",countDownloads:'path_extension:"safetensors"'},trellis2:{prettyLabel:"TRELLIS.2",repoName:"TRELLIS.2",repoUrl:"https://github.com/microsoft/TRELLIS.2",countDownloads:'path_extension:"safetensors"'},tunejury:{prettyLabel:"TuneJury",repoName:"TuneJury",repoUrl:"https://github.com/yonghyunk1m/TuneJury",countDownloads:'path_extension:"pt"'},ultralytics:{prettyLabel:"ultralytics",repoName:"ultralytics",repoUrl:"https://github.com/ultralytics/ultralytics",docsUrl:"https://github.com/ultralytics/ultralytics",filter:!1,countDownloads:'path_extension:"pt"',snippets:xr},univa:{prettyLabel:"univa",repoName:"univa",repoUrl:"https://github.com/PKU-YuanGroup/UniWorld-V1",snippets:Us,filter:!0,countDownloads:'path:"config.json"'},"uni-3dar":{prettyLabel:"Uni-3DAR",repoName:"Uni-3DAR",repoUrl:"https://github.com/dptech-corp/Uni-3DAR",docsUrl:"https://github.com/dptech-corp/Uni-3DAR",countDownloads:'path_extension:"pt"'},"unity-sentis":{prettyLabel:"unity-sentis",repoName:"unity-sentis",repoUrl:"https://github.com/Unity-Technologies/sentis-samples",snippets:ws,filter:!0,countDownloads:'path_extension:"sentis"'},sana:{prettyLabel:"Sana",repoName:"Sana",repoUrl:"https://github.com/NVlabs/Sana",countDownloads:'path_extension:"pth"',snippets:_s},videoprism:{prettyLabel:"VideoPrism",repoName:"VideoPrism",repoUrl:"https://github.com/google-deepmind/videoprism",countDownloads:'path_extension:"npz"',snippets:xs},"vfi-mamba":{prettyLabel:"VFIMamba",repoName:"VFIMamba",repoUrl:"https://github.com/MCG-NJU/VFIMamba",countDownloads:'path_extension:"pkl"',snippets:As},vismatch:{prettyLabel:"VisMatch",repoName:"VisMatch",repoUrl:"https://github.com/gmberton/vismatch",filter:!1,countDownloads:'path:"vismatch.yaml"'},lvface:{prettyLabel:"LVFace",repoName:"LVFace",repoUrl:"https://github.com/bytedance/LVFace",countDownloads:'path_extension:"pt" OR path_extension:"onnx"',snippets:ks},voicecraft:{prettyLabel:"VoiceCraft",repoName:"VoiceCraft",repoUrl:"https://github.com/jasonppy/VoiceCraft",docsUrl:"https://github.com/jasonppy/VoiceCraft",snippets:Is},voxcpm:{prettyLabel:"VoxCPM",repoName:"VoxCPM",repoUrl:"https://github.com/OpenBMB/VoxCPM",snippets:Ts,filter:!1},vui:{prettyLabel:"Vui",repoName:"Vui",repoUrl:"https://github.com/vui-ai/vui",countDownloads:'path_extension:"pt"',snippets:Ss},vqweb:{prettyLabel:"vqweb",repoName:"vqweb",repoUrl:"https://github.com/rosecky/embedding-quantization-public/tree/main/packages/vqweb",docsUrl:"https://www.npmjs.com/package/@thinletterio/vqweb",countDownloads:'path_extension:"vqw"',filter:!1},vibevoice:{prettyLabel:"VibeVoice",repoName:"VibeVoice",repoUrl:"https://github.com/microsoft/VibeVoice",snippets:vs,filter:!1},videox_fun:{prettyLabel:"VideoX Fun",repoName:"VideoX Fun",repoUrl:"https://github.com/aigc-apps/VideoX-Fun",filter:!1,countDownloads:'path_extension:"safetensors"'},"wan2.2":{prettyLabel:"Wan2.2",repoName:"Wan2.2",repoUrl:"https://github.com/Wan-Video/Wan2.2",countDownloads:'path_filename:"config" AND path_extension:"json"'},wham:{prettyLabel:"WHAM",repoName:"wham",repoUrl:"https://huggingface.co/microsoft/wham",docsUrl:"https://huggingface.co/microsoft/wham/blob/main/README.md",countDownloads:'path_extension:"ckpt"'},whisperkit:{prettyLabel:"WhisperKit",repoName:"WhisperKit",repoUrl:"https://github.com/argmaxinc/WhisperKit",docsUrl:"https://github.com/argmaxinc/WhisperKit?tab=readme-ov-file#homebrew",snippets:Ys,countDownloads:'path_filename:"model" AND path_extension:"mil" AND _exists_:"path_prefix"'},yolov10:{prettyLabel:"YOLOv10",repoName:"YOLOv10",repoUrl:"https://github.com/THU-MIG/yolov10",docsUrl:"https://github.com/THU-MIG/yolov10",countDownloads:'path_extension:"pt" OR path_extension:"safetensors"',snippets:xr},yolov26:{prettyLabel:"YOLOv26",repoName:"YOLOv26",repoUrl:"https://github.com/ultralytics/ultralytics",docsUrl:"https://docs.ultralytics.com/models/yolo26/",countDownloads:'path_extension:"pt" OR path_extension:"safetensors"'},zonos:{prettyLabel:"Zonos",repoName:"Zonos",repoUrl:"https://github.com/Zyphra/Zonos",docsUrl:"https://github.com/Zyphra/Zonos",snippets:Ws,filter:!1},"3dtopia-xl":{prettyLabel:"3DTopia-XL",repoName:"3DTopia-XL",repoUrl:"https://github.com/3DTopia/3DTopia-XL",filter:!1,countDownloads:'path:"model_vae_fp16.pt"',snippets:zs}},du=Object.keys(Ar),mu=Object.entries(Ar).filter(([e,t])=>t.filter).map(([e])=>e);var k;(function(e){e[e.F32=0]="F32",e[e.F16=1]="F16",e[e.Q4_0=2]="Q4_0",e[e.Q4_1=3]="Q4_1",e[e.Q4_1_SOME_F16=4]="Q4_1_SOME_F16",e[e.Q4_2=5]="Q4_2",e[e.Q4_3=6]="Q4_3",e[e.Q8_0=7]="Q8_0",e[e.Q5_0=8]="Q5_0",e[e.Q5_1=9]="Q5_1",e[e.Q2_K=10]="Q2_K",e[e.Q3_K_S=11]="Q3_K_S",e[e.Q3_K_M=12]="Q3_K_M",e[e.Q3_K_L=13]="Q3_K_L",e[e.Q4_K_S=14]="Q4_K_S",e[e.Q4_K_M=15]="Q4_K_M",e[e.Q5_K_S=16]="Q5_K_S",e[e.Q5_K_M=17]="Q5_K_M",e[e.Q6_K=18]="Q6_K",e[e.IQ2_XXS=19]="IQ2_XXS",e[e.IQ2_XS=20]="IQ2_XS",e[e.Q2_K_S=21]="Q2_K_S",e[e.IQ3_XS=22]="IQ3_XS",e[e.IQ3_XXS=23]="IQ3_XXS",e[e.IQ1_S=24]="IQ1_S",e[e.IQ4_NL=25]="IQ4_NL",e[e.IQ3_S=26]="IQ3_S",e[e.IQ3_M=27]="IQ3_M",e[e.IQ2_S=28]="IQ2_S",e[e.IQ2_M=29]="IQ2_M",e[e.IQ4_XS=30]="IQ4_XS",e[e.IQ1_M=31]="IQ1_M",e[e.BF16=32]="BF16",e[e.Q4_0_4_4=33]="Q4_0_4_4",e[e.Q4_0_4_8=34]="Q4_0_4_8",e[e.Q4_0_8_8=35]="Q4_0_8_8",e[e.TQ1_0=36]="TQ1_0",e[e.TQ2_0=37]="TQ2_0",e[e.MXFP4_MOE=38]="MXFP4_MOE",e[e.NVFP4=39]="NVFP4",e[e.Q1_0=40]="Q1_0",e[e.Q2_0=41]="Q2_0",e[e.Q2_K_XL=1e3]="Q2_K_XL",e[e.Q3_K_XL=1001]="Q3_K_XL",e[e.Q4_K_XL=1002]="Q4_K_XL",e[e.Q5_K_XL=1003]="Q5_K_XL",e[e.Q6_K_XL=1004]="Q6_K_XL",e[e.Q8_K_XL=1005]="Q8_K_XL"})(k||(k={}));var uu=Object.values(k).filter(e=>typeof e=="string"),fu=["MXFP4"],gu=new RegExp(`(?<prefix>UD-)?(?<quant>${[...uu,...fu].join("|")})(_(?<sizeVariation>[A-Z]+))?`),Ux=new RegExp(gu,"g");var Mx=[k.F32,k.BF16,k.F16,k.Q8_K_XL,k.Q8_0,k.Q6_K_XL,k.Q6_K,k.Q5_K_XL,k.Q5_K_M,k.Q5_K_S,k.Q5_0,k.Q5_1,k.Q4_K_XL,k.Q4_K_M,k.Q4_K_S,k.IQ4_NL,k.IQ4_XS,k.Q4_0_4_4,k.Q4_0_4_8,k.Q4_0_8_8,k.Q4_1_SOME_F16,k.Q4_0,k.Q4_1,k.Q4_2,k.Q4_3,k.MXFP4_MOE,k.NVFP4,k.Q3_K_XL,k.Q3_K_L,k.Q3_K_M,k.Q3_K_S,k.IQ3_M,k.IQ3_S,k.IQ3_XS,k.IQ3_XXS,k.Q2_K_XL,k.Q2_K,k.Q2_K_S,k.IQ2_M,k.IQ2_S,k.IQ2_XS,k.IQ2_XXS,k.Q2_0,k.IQ1_S,k.IQ1_M,k.TQ1_0,k.TQ2_0,k.Q1_0];var Qs;(function(e){e[e.F32=0]="F32",e[e.F16=1]="F16",e[e.Q4_0=2]="Q4_0",e[e.Q4_1=3]="Q4_1",e[e.Q5_0=6]="Q5_0",e[e.Q5_1=7]="Q5_1",e[e.Q8_0=8]="Q8_0",e[e.Q8_1=9]="Q8_1",e[e.Q2_K=10]="Q2_K",e[e.Q3_K=11]="Q3_K",e[e.Q4_K=12]="Q4_K",e[e.Q5_K=13]="Q5_K",e[e.Q6_K=14]="Q6_K",e[e.Q8_K=15]="Q8_K",e[e.IQ2_XXS=16]="IQ2_XXS",e[e.IQ2_XS=17]="IQ2_XS",e[e.IQ3_XXS=18]="IQ3_XXS",e[e.IQ1_S=19]="IQ1_S",e[e.IQ4_NL=20]="IQ4_NL",e[e.IQ3_S=21]="IQ3_S",e[e.IQ2_S=22]="IQ2_S",e[e.IQ4_XS=23]="IQ4_XS",e[e.I8=24]="I8",e[e.I16=25]="I16",e[e.I32=26]="I32",e[e.I64=27]="I64",e[e.F64=28]="F64",e[e.IQ1_M=29]="IQ1_M",e[e.BF16=30]="BF16",e[e.TQ1_0=34]="TQ1_0",e[e.TQ2_0=35]="TQ2_0",e[e.MXFP4=39]="MXFP4",e[e.NVFP4=40]="NVFP4",e[e.Q1_0=41]="Q1_0",e[e.Q2_0=42]="Q2_0"})(Qs||(Qs={}));var kr=["python","js","sh"];var Js;(function(e){e[e.BLACKWELL_ULTRA=12.1]="BLACKWELL_ULTRA",e[e.BLACKWELL_RTX=12]="BLACKWELL_RTX",e[e.THOR=11]="THOR",e[e.BLACKWELL=10]="BLACKWELL",e[e.HOPPER=9]="HOPPER",e[e.ADA_LOVELACE=8.9]="ADA_LOVELACE",e[e.ORIN=8.7]="ORIN",e[e.AMPERE_RTX=8.6]="AMPERE_RTX",e[e.AMPERE=8]="AMPERE",e[e.TURING=7.5]="TURING",e[e.XAVIER=7.2]="XAVIER",e[e.VOLTA=7]="VOLTA",e[e.PASCAL_TEGRA=6.2]="PASCAL_TEGRA",e[e.PASCAL=6.1]="PASCAL",e[e.PASCAL_DATACENTER=6]="PASCAL_DATACENTER",e[e.MAXWELL=5.3]="MAXWELL"})(Js||(Js={}));var zx=10**14,Wx=10**11,Kx=10**8,Qx=10**13;var Ir={js:{fetch:{basic:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicAudio:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "audio/flac",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,conversational:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ 
{{ autoInputs.asTsString }}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToImage:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"inputs": \`data:image/png;base64,\${data.inputs.encode("base64")}\`,
				"parameters": data.parameters,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({ 
	inputs: image,
	parameters: {
		prompt: "{{ inputs.asObj.parameters.prompt }}",
	}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToVideo:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"image_url": \`data:image/png;base64,\${data.image.encode("base64")}\`,
				"prompt": data.prompt,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({
	"image": image,
	"prompt": "{{inputs.asObj.parameters.prompt}}",
}).then((response) => {
    // Use video
});`,textToAudio:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,textToImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}


query({ {{ providerInputs.asTsString }} }).then((response) => {
    // Use image
});`,textToSpeech:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,zeroShotClassification:`async function query(data) {
    const response = await fetch(
		"{{ fullUrl }}",
        {
            headers: {
				Authorization: "{{ authorizationHeader }}",
                "Content-Type": "application/json",
{% if billTo %}
                "X-HF-Bill-To": "{{ billTo }}",
{% endif %}         },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: {{ providerInputs.asObj.inputs }},
    parameters: { candidate_labels: ["refund", "legal", "faq"] }
}).then((response) => {
    console.log(JSON.stringify(response));
});`},"huggingface.js":{basic:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicAudio:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,conversational:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const chatCompletion = await client.chatCompletion({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
{% if directRequest %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
{% else %}
    model: "{{ providerModelId }}",
{% endif %}
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

let out = "";

const stream = client.chatCompletionStream({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

for await (const chunk of stream) {
	if (chunk.choices && chunk.choices.length > 0) {
		const newContent = chunk.choices[0].delta.content;
		out += newContent;
		console.log(newContent);
	}
}`,imageToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const image = await client.imageToImage({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)
// For example, you can save it to a file or display it in an image element
`,imageToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const video = await client.imageToVideo({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

/// Use the generated video (it's a Blob)
// For example, you can save it to a file or display it in a video element
`,textToAudio:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const audio = await client.textToAudio({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated audio (it's a Blob)
`,textToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const image = await client.textToImage({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	parameters: { num_inference_steps: 5 },
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)`,textToSpeech:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const audio = await client.textToSpeech({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated audio (it's a Blob)`,textToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const video = await client.textToVideo({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated video (it's a Blob)`},openai:{conversational:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
	defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const chatCompletion = await client.chat.completions.create({
	model: "{{ providerModelId }}",
{{ inputs.asTsString }}
});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
    defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const stream = await client.chat.completions.create({
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
    stream: true,
});

for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`}},python:{fal_client:{imageToImage:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "fal-ai/flux-kontext/dev",
    arguments={
        "prompt": f"data:image/png;base64,{image_base_64}",
        "image_url": "{{ providerInputs.asObj.inputs }}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,imageToVideo:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "{{model.id}}",
    arguments={
        "image_url": f"data:image/png;base64,{image_base_64}",
        "prompt": "{{inputs.asObj.parameters.prompt}}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,textToImage:`{% if provider == "fal-ai" %}
import fal_client

{% if providerInputs.asObj.loras is defined and providerInputs.asObj.loras != none %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
        "loras":{{ providerInputs.asObj.loras | tojson }},
    },
)
{% else %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
    },
)
{% endif %} 
print(result)
{% endif %} `},huggingface_hub:{basic:`result = client.{{ methodName }}(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
)`,basicAudio:'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',basicImage:'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',conversational:`completion = client.chat.completions.create(
{% if directRequest %}
    model="{{ model.id }}",
{% else %}
    model="{{ providerModelId }}",
{% endif %}
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="") `,documentQuestionAnswering:`output = client.document_question_answering(
    "{{ inputs.asObj.image }}",
    question="{{ inputs.asObj.question }}",
    model="{{ model.id }}",
) `,imageToImage:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

# output is a PIL.Image object
image = client.image_to_image(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
)
`,imageToVideo:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

video = client.image_to_video(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
) 
`,importInferenceClient:`from huggingface_hub import InferenceClient

client = InferenceClient(
{% if endpointUrl %}
    base_url="{{ baseUrl }}",
{% endif %}
{% if task != "conversational" or directRequest %}
    provider="{{ provider }}",
{% endif %}
    api_key="{{ accessToken }}",
{% if billTo %}
    bill_to="{{ billTo }}",
{% endif %}
)`,questionAnswering:`answer = client.question_answering(
    question="{{ inputs.asObj.question }}",
    context="{{ inputs.asObj.context }}",
    model="{{ model.id }}",
) `,tableQuestionAnswering:`answer = client.table_question_answering(
    query="{{ inputs.asObj.query }}",
    table={{ inputs.asObj.table }},
    model="{{ model.id }}",
) `,textToImage:`# output is a PIL.Image object
image = client.text_to_image(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `,textToSpeech:`# audio is returned as bytes
audio = client.text_to_speech(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) 
`,textToVideo:`video = client.text_to_video(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `},openai:{conversational:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

completion = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`},requests:{basic:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
}) `,basicAudio:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "audio/flac", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,basicImage:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "image/jpeg", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,conversational:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

response = query({
{{ autoInputs.asJsonString }}
})

print(response["choices"][0]["message"])`,conversationalStream:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload, stream=True)
    for line in response.iter_lines():
        if not line.startswith(b"data:"):
            continue
        if line.strip() == b"data: [DONE]":
            return
        yield json.loads(line.decode("utf-8").lstrip("data:").rstrip("/n"))

chunks = query({
{{ autoInputs.asJsonString }},
    "stream": True,
})

for chunk in chunks:
    print(chunk["choices"][0]["delta"]["content"], end="")`,documentQuestionAnswering:`def query(payload):
    with open(payload["image"], "rb") as f:
        img = f.read()
        payload["image"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {
        "image": "{{ inputs.asObj.image }}",
        "question": "{{ inputs.asObj.question }}",
    },
}) `,imageToImage:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
{{ providerInputs.asJsonString }}
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes)) `,imageToVideo:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

video_bytes = query({
{{ inputs.asJsonString }}
})
`,importRequests:`{% if importBase64 %}
import base64
{% endif %}
{% if importJson %}
import json
{% endif %}
import requests

API_URL = "{{ fullUrl }}"
headers = {
    "Authorization": "{{ authorizationHeader }}",
{% if billTo %}
    "X-HF-Bill-To": "{{ billTo }}"
{% endif %}
}`,tabular:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

response = query({
    "inputs": {
        "data": {{ providerInputs.asObj.inputs }}
    },
}) `,textToAudio:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,textToImage:`{% if provider == "hf-inference" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
    "inputs": {{ providerInputs.asObj.inputs }},
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))
{% endif %}`,textToSpeech:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,zeroShotClassification:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
}) `,zeroShotImageClassification:`def query(data):
    with open(data["image_path"], "rb") as f:
        img = f.read()
    payload={
        "parameters": data["parameters"],
        "inputs": base64.b64encode(img).decode("utf-8")
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "image_path": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["cat", "dog", "llama"]},
}) `}},sh:{curl:{basic:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ providerInputs.asCurlString }}
    }'`,basicAudio:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: audio/flac' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,basicImage:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: image/jpeg' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,conversational:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": false
    }'`,conversationalStream:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": true
    }'`,zeroShotClassification:`curl {{ fullUrl }} \\
    -X POST \\
    -d '{"inputs": {{ providerInputs.asObj.inputs }}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: {{ authorizationHeader }}'
{% if billTo %} \\
    -H 'X-HF-Bill-To: {{ billTo }}'
{% endif %}`}}};var hu=["openai","huggingface_hub","fal_client","requests"],yu=["openai","huggingface.js","fetch"],bu=["curl"],wu={js:[...yu],python:[...hu],sh:[...bu]},_u={js:["huggingface.js"],python:["huggingface_hub"]},vu=(e,t,o)=>Ir[e]?.[t]?.[o]!==void 0,Sr=(e,t,o)=>{let r=Ir[e]?.[t]?.[o];if(!r)throw new Error(`Template not found: ${e}/${t}/${o}`);return a=>new Aa(r).render({...a})},xu=Sr("python","huggingface_hub","importInferenceClient"),Au=Sr("python","requests","importRequests"),Gs={"audio-classification":"audio_classification","audio-to-audio":"audio_to_audio","automatic-speech-recognition":"automatic_speech_recognition","document-question-answering":"document_question_answering","feature-extraction":"feature_extraction","fill-mask":"fill_mask","image-classification":"image_classification","image-segmentation":"image_segmentation","image-to-image":"image_to_image","image-to-video":"image_to_video","image-to-text":"image_to_text","image-text-to-image":"image_text_to_image","image-text-to-video":"image_text_to_video","object-detection":"object_detection","question-answering":"question_answering","sentence-similarity":"sentence_similarity",summarization:"summarization","table-question-answering":"table_question_answering","tabular-classification":"tabular_classification","tabular-regression":"tabular_regression","text-classification":"text_classification","text-generation":"text_generation","text-to-image":"text_to_image","text-to-speech":"text_to_speech","text-to-video":"text_to_video","token-classification":"token_classification",translation:"translation","visual-question-answering":"visual_question_answering","zero-shot-classification":"zero_shot_classification","zero-shot-image-classification":"zero_shot_image_classification"},Zs={"automatic-speech-recognition":"automaticSpeechRecognition","feature-extraction":"featureExtraction","fill-mask":"fillMask","image-classification":"imageClassification","question-answering":"questionAnswering","sentence-similarity":"sentenceSimilarity","text-ranking":"textRanking",summarization:"summarization","table-question-answering":"tableQuestionAnswering","text-classification":"textClassification","text-generation":"textGeneration","token-classification":"tokenClassification","text-to-speech":"textToSpeech",translation:"translation"},ku="hf_token_placeholder",Iu="not_hf_token_placeholder",O=(e,t)=>(o,r,a,n)=>{let i=ye(),s=a?.providerId??o.id,d=o.pipeline_tag;o.pipeline_tag&&["text-generation","image-text-to-text"].includes(o.pipeline_tag)&&(e=n?.streaming?"conversationalStream":"conversational",t=Su,d="conversational");let p;try{p=b(r,d)}catch(te){return i.error(`Failed to get provider helper for ${r} (${d})`,te),[]}let c=n?.directRequest?Iu:ku,l=n?.accessToken??c,u=n?.inputs?{inputs:n.inputs}:t?t(o,n):{inputs:fe(o)},y=Yo(s,p,{accessToken:l,provider:r,endpointUrl:n?.endpointUrl??(r==="auto"?nt:void 0),...u},a,{task:d,billTo:n?.billTo}),E=u,N=y.info.body;if(typeof N=="string")try{E=JSON.parse(N)}catch(te){i.error("Failed to parse body as JSON",te)}let F=!n?.endpointUrl&&!n?.directRequest?r!=="auto"?{...u,model:`${o.id}:${r}`}:{...u,model:`${o.id}`}:E,j={accessToken:l,authorizationHeader:y.info.headers?.Authorization,baseUrl:d==="conversational"&&!n?.endpointUrl&&!n?.directRequest?nt:Pu(y.url,"/chat/completions"),fullUrl:d==="conversational"&&!n?.endpointUrl&&!n?.directRequest?nt+"/chat/completions":y.url,inputs:{asObj:u,asCurlString:ne(u,"curl"),asJsonString:ne(u,"json"),asPythonString:ne(u,"python"),asTsString:ne(u,"ts")},providerInputs:{asObj:E,asCurlString:ne(E,"curl"),asJsonString:ne(E,"json"),asPythonString:ne(E,"python"),asTsString:ne(E,"ts")},autoInputs:{asObj:F,asCurlString:ne(F,"curl"),asJsonString:ne(F,"json"),asPythonString:ne(F,"python"),asTsString:ne(F,"ts")},model:o,provider:r,providerModelId:d==="conversational"&&!n?.endpointUrl&&!n?.directRequest?r!=="auto"?`${o.id}:${r}`:o.id:s??o.id,billTo:n?.billTo,endpointUrl:n?.endpointUrl,task:d,directRequest:!!n?.directRequest},ge=r==="auto"&&d!=="conversational"?_u:wu;return kr.map(te=>(ge[te]??[]).map(oe=>{if(!vu(te,oe,e))return;let Xe=Sr(te,oe,e);if(oe==="huggingface_hub"&&e.includes("basic")){if(!(o.pipeline_tag&&o.pipeline_tag in Gs))return;j.methodName=Gs[o.pipeline_tag]}if(oe==="huggingface.js"&&e.includes("basic")){if(!(o.pipeline_tag&&o.pipeline_tag in Zs))return;j.methodName=Zs[o.pipeline_tag]}let G=Xe(j).trim();if(G)return oe==="huggingface_hub"?G=`${xu({...j})}

${G}`:oe==="requests"&&(G=`${Au({...j,importBase64:G.includes("base64"),importJson:G.includes("json.")})}

${G}`),G.includes(c)&&(G=Cu(n?.directRequest,c,G,te,r,n?.endpointUrl)),{language:te,client:oe,content:G}}).filter(oe=>oe!==void 0)).flat()},Tu=e=>JSON.parse(fe(e)),or=e=>{let t=JSON.parse(fe(e));return{inputs:t.image,parameters:{prompt:t.prompt}}},Su=(e,t)=>({messages:t?.messages??fe(e),...t?.temperature?{temperature:t?.temperature}:void 0,...t?.max_tokens?{max_tokens:t?.max_tokens}:void 0,...t?.top_p?{top_p:t?.top_p}:void 0}),Ru=e=>{let t=JSON.parse(fe(e));return{question:t.question,context:t.context}},Eu=e=>{let t=JSON.parse(fe(e));return{query:t.query,table:JSON.stringify(t.table)}},X0={"audio-classification":O("basicAudio"),"audio-to-audio":O("basicAudio"),"automatic-speech-recognition":O("basicAudio"),"document-question-answering":O("documentQuestionAnswering",Tu),"feature-extraction":O("basic"),"fill-mask":O("basic"),"image-classification":O("basicImage"),"image-segmentation":O("basicImage"),"image-text-to-image":O("imageToImage",or),"image-text-to-text":O("conversational"),"image-text-to-video":O("imageToVideo",or),"image-to-image":O("imageToImage",or),"image-to-text":O("basicImage"),"image-to-video":O("imageToVideo",or),"object-detection":O("basicImage"),"question-answering":O("questionAnswering",Ru),"sentence-similarity":O("basic"),"text-ranking":O("basic"),summarization:O("basic"),"tabular-classification":O("tabular"),"tabular-regression":O("tabular"),"table-question-answering":O("tableQuestionAnswering",Eu),"text-classification":O("basic"),"text-generation":O("basic"),"text-to-audio":O("textToAudio"),"text-to-image":O("textToImage"),"text-to-speech":O("textToSpeech"),"text-to-video":O("textToVideo"),"token-classification":O("basic"),translation:O("basic"),"zero-shot-classification":O("zeroShotClassification"),"zero-shot-image-classification":O("zeroShotImageClassification")};function ne(e,t){switch(t){case"curl":return el(ne(e,"json"));case"json":return JSON.stringify(e,null,4).split(`
`).slice(1,-1).join(`
`);case"python":return el(Object.entries(e).map(([o,r])=>{let a=JSON.stringify(r,null,4).replace(/"/g,'"');return`${o}=${a},`}).join(`
`));case"ts":return Tr(e).split(`
`).slice(1,-1).join(`
`);default:throw new Error(`Unsupported format: ${t}`)}}function Tr(e,t){return t=t??0,typeof e!="object"||e===null?JSON.stringify(e):Array.isArray(e)?`[
${e.map(n=>{let i=Tr(n,t+1);return`${" ".repeat(4*(t+1))}${i},`}).join(`
`)}
${" ".repeat(4*t)}]`:`{
${Object.entries(e).map(([a,n])=>{let i=Tr(n,t+1),s=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(a)?a:`"${a}"`;return`${" ".repeat(4*(t+1))}${s}: ${i},`}).join(`
`)}
${" ".repeat(4*t)}}`}function el(e){return e.split(`
`).map(t=>" ".repeat(4)+t).join(`
`)}function Pu(e,t){return e.endsWith(t)?e.slice(0,-t.length):e}function Cu(e,t,o,r,a,n){let s=!n&&(a=="hf-inference"||!e&&(o.includes("InferenceClient")||o.includes("https://router.huggingface.co")))?"HF_TOKEN":n?"API_TOKEN":a.toUpperCase().replace("-","_")+"_API_KEY";return r==="sh"?o=o.replace(`'Authorization: Bearer ${t}'`,`"Authorization: Bearer $${s}"`):r==="python"?(o=`import os
`+o,o=o.replace(`"${t}"`,`os.environ["${s}"]`),o=o.replace(`"Bearer ${t}"`,`f"Bearer {os.environ['${s}']}"`),o=o.replace(`"Key ${t}"`,`f"Key {os.environ['${s}']}"`),o=o.replace(`"X-Key ${t}"`,`f"X-Key {os.environ['${s}']}"`)):r==="js"&&(o=o.replace(`"${t}"`,`process.env.${s}`),o=o.replace(`Authorization: "Bearer ${t}",`,`Authorization: \`Bearer \${process.env.${s}}\`,`),o=o.replace(`Authorization: "Key ${t}",`,`Authorization: \`Key \${process.env.${s}}\`,`),o=o.replace(`Authorization: "X-Key ${t}",`,`Authorization: \`X-Key \${process.env.${s}}\`,`)),o}return ll(Uu);})();
