var t,e,n,s,o,i,a,r,l,d,c,u,h,f,g,E,p,m,C,y,O,I,v,_,T=globalThis,N={},A={},S=T.parcelRequire94c2;null==S&&((S=function(t){if(t in N)return N[t].exports;if(t in A){var e=A[t];delete A[t];var n={id:t,exports:{}};return N[t]=n,e.call(n.exports,n,n.exports),n.exports}var s=Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){A[t]=e},T.parcelRequire94c2=S),S.register,(t=h||(h={})).STRING="string",t.NUMBER="number",t.INTEGER="integer",t.BOOLEAN="boolean",t.ARRAY="array",t.OBJECT="object",(e=f||(f={})).LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python",(n=g||(g={})).OUTCOME_UNSPECIFIED="outcome_unspecified",n.OUTCOME_OK="outcome_ok",n.OUTCOME_FAILED="outcome_failed",n.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=["user","model","function","system"];(s=E||(E={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",s.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",s.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",s.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",s.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(o=p||(p={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE",(i=m||(m={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH",(a=C||(C={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",a.SAFETY="SAFETY",a.OTHER="OTHER",(r=y||(y={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER",(l=O||(O={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",l.RETRIEVAL_QUERY="RETRIEVAL_QUERY",l.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",l.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",l.CLASSIFICATION="CLASSIFICATION",l.CLUSTERING="CLUSTERING",(d=I||(I={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.AUTO="AUTO",d.ANY="ANY",d.NONE="NONE",(c=v||(v={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",c.MODE_DYNAMIC="MODE_DYNAMIC";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class w extends b{constructor(t,e){super(t),this.response=e}}class M extends b{constructor(t,e,n,s){super(t),this.status=e,this.statusText=n,this.errorDetails=s}}class x extends b{}(u=_||(_={})).GENERATE_CONTENT="generateContent",u.STREAM_GENERATE_CONTENT="streamGenerateContent",u.COUNT_TOKENS="countTokens",u.EMBED_CONTENT="embedContent",u.BATCH_EMBED_CONTENTS="batchEmbedContents";class L{constructor(t,e,n,s,o){this.model=t,this.task=e,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var t,e;let n=(null===(t=this.requestOptions)||void 0===t?void 0:t.apiVersion)||"v1beta",s=(null===(e=this.requestOptions)||void 0===e?void 0:e.baseUrl)||"https://generativelanguage.googleapis.com",o=`${s}/${n}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}async function D(t){var e;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(t){let e=[];return(null==t?void 0:t.apiClient)&&e.push(t.apiClient),e.push("genai-js/0.22.0"),e.join(" ")}(t.requestOptions)),n.append("x-goog-api-key",t.apiKey);let s=null===(e=t.requestOptions)||void 0===e?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(t){throw new x(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${t.message}`)}for(let[t,e]of s.entries()){if("x-goog-api-key"===t)throw new x(`Cannot set reserved header name ${t}`);if("x-goog-api-client"===t)throw new x(`Header name ${t} can only be set using the apiClient field`);n.append(t,e)}}return n}async function $(t,e,n,s,o,i){let a=new L(t,e,n,s,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(t){let e={};if((null==t?void 0:t.signal)!==void 0||(null==t?void 0:t.timeout)>=0){let n=new AbortController;(null==t?void 0:t.timeout)>=0&&setTimeout(()=>n.abort(),t.timeout),(null==t?void 0:t.signal)&&t.signal.addEventListener("abort",()=>{n.abort()}),e.signal=n.signal}return e}(i)),{method:"POST",headers:await D(a),body:o})}}async function F(t,e,n,s,o,i={},a=fetch){let{url:r,fetchOptions:l}=await $(t,e,n,s,o,i);return H(r,l,a)}async function H(t,e,n=fetch){let s;try{s=await n(t,e)}catch(e){!function(t,e){let n=t;throw t instanceof M||t instanceof x||((n=new b(`Error fetching from ${e.toString()}: ${t.message}`)).stack=t.stack),n}(e,t)}return s.ok||await U(s,t),s}async function U(t,e){let n,s="";try{let e=await t.json();s=e.error.message,e.error.details&&(s+=` ${JSON.stringify(e.error.details)}`,n=e.error.details)}catch(t){}throw new M(`Error fetching from ${e.toString()}: [${t.status} ${t.statusText}] ${s}`,t.status,t.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(t){return t.text=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),j(t.candidates[0]))throw new w(`${k(t)}`,t);return function(t){var e,n,s,o;let i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(let e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.text&&i.push(e.text),e.executableCode&&i.push("\n```"+e.executableCode.language+"\n"+e.executableCode.code+"\n```\n"),e.codeExecutionResult&&i.push("\n```\n"+e.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(t)}if(t.promptFeedback)throw new w(`Text not available. ${k(t)}`,t);return""},t.functionCall=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),j(t.candidates[0]))throw new w(`${k(t)}`,t);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),B(t)[0]}if(t.promptFeedback)throw new w(`Function call not available. ${k(t)}`,t)},t.functionCalls=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),j(t.candidates[0]))throw new w(`${k(t)}`,t);return B(t)}if(t.promptFeedback)throw new w(`Function call not available. ${k(t)}`,t)},t}function B(t){var e,n,s,o;let i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(let e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.functionCall&&i.push(e.functionCall);return i.length>0?i:void 0}const G=[y.RECITATION,y.SAFETY,y.LANGUAGE];function j(t){return!!t.finishReason&&G.includes(t.finishReason)}function k(t){var e,n,s;let o="";if((!t.candidates||0===t.candidates.length)&&t.promptFeedback)o+="Response was blocked",(null===(e=t.promptFeedback)||void 0===e?void 0:e.blockReason)&&(o+=` due to ${t.promptFeedback.blockReason}`),(null===(n=t.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${t.promptFeedback.blockReasonMessage}`);else if(null===(s=t.candidates)||void 0===s?void 0:s[0]){let e=t.candidates[0];j(e)&&(o+=`Candidate was blocked due to ${e.finishReason}`,e.finishMessage&&(o+=`: ${e.finishMessage}`))}return o}function K(t){return this instanceof K?(this.v=t,this):new K(t)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function q(t){let e=[],n=t.getReader();for(;;){let{done:t,value:s}=await n.read();if(t)return P(function(t){let e=t[t.length-1],n={promptFeedback:null==e?void 0:e.promptFeedback};for(let e of t){if(e.candidates){let t=0;for(let s of e.candidates)if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:t}),n.candidates[t].citationMetadata=s.citationMetadata,n.candidates[t].groundingMetadata=s.groundingMetadata,n.candidates[t].finishReason=s.finishReason,n.candidates[t].finishMessage=s.finishMessage,n.candidates[t].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[t].content||(n.candidates[t].content={role:s.content.role||"user",parts:[]});let e={};for(let o of s.content.parts)o.text&&(e.text=o.text),o.functionCall&&(e.functionCall=o.functionCall),o.executableCode&&(e.executableCode=o.executableCode),o.codeExecutionResult&&(e.codeExecutionResult=o.codeExecutionResult),0===Object.keys(e).length&&(e.text=""),n.candidates[t].content.parts.push(e)}t++}e.usageMetadata&&(n.usageMetadata=e.usageMetadata)}return n}(e));e.push(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(t,e,n,s){return function(t){let[e,n]=(function(t){let e=t.getReader();return new ReadableStream({start(t){let n="";return function s(){return e.read().then(({value:e,done:o})=>{let i;if(o){if(n.trim()){t.error(new b("Failed to parse stream"));return}t.close();return}let a=(n+=e).match(Y);for(;a;){try{i=JSON.parse(a[1])}catch(e){t.error(new b(`Error parsing JSON response: "${a[1]}"`));return}t.enqueue(i),a=(n=n.substring(a[0].length)).match(Y)}return s()})}()}})})(t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(t){return function(t,e,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(t,e||[]),i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(t){o[t]&&(s[t]=function(e){return new Promise(function(n,s){i.push([t,e,n,s])>1||r(t,e)})})}function r(t,e){try{var n;(n=o[t](e)).value instanceof K?Promise.resolve(n.value.v).then(l,d):c(i[0][2],n)}catch(t){c(i[0][3],t)}}function l(t){r("next",t)}function d(t){r("throw",t)}function c(t,e){t(e),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,function*(){let e=t.getReader();for(;;){let{value:t,done:n}=yield K(e.read());if(n)break;yield yield K(P(t))}})}(e),response:q(n)}}(await F(e,_.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s))}async function V(t,e,n,s){let o=await F(e,_.GENERATE_CONTENT,t,!1,JSON.stringify(n),s);return{response:P(await o.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t){if(null!=t){if("string"==typeof t)return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function X(t){let e=[];if("string"==typeof t)e=[{text:t}];else for(let n of t)"string"==typeof n?e.push({text:n}):e.push(n);return function(t){let e={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,o=!1;for(let i of t)"functionResponse"in i?(n.parts.push(i),o=!0):(e.parts.push(i),s=!0);if(s&&o)throw new b("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new b("No content is provided for sending chat message.");return s?e:n}(e)}function z(t){let e;return e=t.contents?t:{contents:[X(t)]},t.systemInstruction&&(e.systemInstruction=W(t.systemInstruction)),e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Z={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},tt="SILENT_ERROR";class te{constructor(t,e,n,s={}){this.model=e,this.params=n,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,(null==n?void 0:n.history)&&(function(t){let e=!1;for(let n of t){let{role:t,parts:s}=n;if(!e&&"user"!==t)throw new b(`First content should be with role 'user', got ${t}`);if(!R.includes(t))throw new b(`Each item should include role field. Got ${t} but valid roles are: ${JSON.stringify(R)}`);if(!Array.isArray(s))throw new b("Content should have 'parts' property with an array of Parts");if(0===s.length)throw new b("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let t of s)for(let e of Q)e in t&&(o[e]+=1);let i=Z[t];for(let e of Q)if(!i.includes(e)&&o[e]>0)throw new b(`Content with role '${t}' can't contain '${e}' part`);e=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,e={}){var n,s,o,i,a,r;let l;await this._sendPromise;let d=X(t),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,d]},u=Object.assign(Object.assign({},this._requestOptions),e);return this._sendPromise=this._sendPromise.then(()=>V(this._apiKey,this.model,c,u)).then(t=>{var e,n;if(t.response.candidates&&t.response.candidates.length>0&&(null===(e=t.response.candidates[0])||void 0===e?void 0:e.content)!==void 0){this._history.push(d);let e=Object.assign({parts:[],role:"model"},null===(n=t.response.candidates)||void 0===n?void 0:n[0].content);this._history.push(e)}else{let e=k(t.response);e&&console.warn(`sendMessage() was unsuccessful. ${e}. Inspect response object for details.`)}l=t}),await this._sendPromise,l}async sendMessageStream(t,e={}){var n,s,o,i,a,r;await this._sendPromise;let l=X(t),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},c=Object.assign(Object.assign({},this._requestOptions),e),u=J(this._apiKey,this.model,d,c);return this._sendPromise=this._sendPromise.then(()=>u).catch(t=>{throw Error(tt)}).then(t=>t.response).then(t=>{var e;if(t.candidates&&t.candidates.length>0&&(null===(e=t.candidates[0])||void 0===e?void 0:e.content)!==void 0){this._history.push(l);let e=Object.assign({},t.candidates[0].content);e.role||(e.role="model"),this._history.push(e)}else{let e=k(t);e&&console.warn(`sendMessageStream() was unsuccessful. ${e}. Inspect response object for details.`)}}).catch(t=>{t.message!==tt&&console.error(t)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn(t,e,n,s){return(await F(e,_.COUNT_TOKENS,t,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ts(t,e,n,s){return(await F(e,_.EMBED_CONTENT,t,!1,JSON.stringify(n),s)).json()}async function to(t,e,n,s){let o=n.requests.map(t=>Object.assign(Object.assign({},t),{model:e}));return(await F(e,_.BATCH_EMBED_CONTENTS,t,!1,JSON.stringify({requests:o}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(t,e,n={}){this.apiKey=t,this._requestOptions=n,e.model.includes("/")?this.model=e.model:this.model=`models/${e.model}`,this.generationConfig=e.generationConfig||{},this.safetySettings=e.safetySettings||[],this.tools=e.tools,this.toolConfig=e.toolConfig,this.systemInstruction=W(e.systemInstruction),this.cachedContent=e.cachedContent}async generateContent(t,e={}){var n;let s=z(t),o=Object.assign(Object.assign({},this._requestOptions),e);return V(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}async generateContentStream(t,e={}){var n;let s=z(t),o=Object.assign(Object.assign({},this._requestOptions),e);return J(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}startChat(t){var e;return new te(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(e=this.cachedContent)||void 0===e?void 0:e.name},t),this._requestOptions)}async countTokens(t,e={}){let n=function(t,e){var n;let s={model:null==e?void 0:e.model,generationConfig:null==e?void 0:e.generationConfig,safetySettings:null==e?void 0:e.safetySettings,tools:null==e?void 0:e.tools,toolConfig:null==e?void 0:e.toolConfig,systemInstruction:null==e?void 0:e.systemInstruction,cachedContent:null===(n=null==e?void 0:e.cachedContent)||void 0===n?void 0:n.name,contents:[]},o=null!=t.generateContentRequest;if(t.contents){if(o)throw new x("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=t.contents}else if(o)s=Object.assign(Object.assign({},s),t.generateContentRequest);else{let e=X(t);s.contents=[e]}return{generateContentRequest:s}}(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),e);return tn(this.apiKey,this.model,n,s)}async embedContent(t,e={}){let n="string"==typeof t||Array.isArray(t)?{content:X(t)}:t,s=Object.assign(Object.assign({},this._requestOptions),e);return ts(this.apiKey,this.model,n,s)}async batchEmbedContents(t,e={}){let n=Object.assign(Object.assign({},this._requestOptions),e);return to(this.apiKey,this.model,t,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(t){this.apiKey=t}getGenerativeModel(t,e){if(!t.model)throw new b("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new ti(this.apiKey,t,e)}getGenerativeModelFromCachedContent(t,e,n){if(!t.name)throw new x("Cached content must contain a `name` field.");if(!t.model)throw new x("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==e?void 0:e[n])&&t[n]&&(null==e?void 0:e[n])!==t[n]){if("model"===n&&(e.model.startsWith("models/")?e.model.replace("models/",""):e.model)===(t.model.startsWith("models/")?t.model.replace("models/",""):t.model))continue;throw new x(`Different value for "${n}" specified in modelParams (${e[n]}) and cachedContent (${t[n]})`)}let s=Object.assign(Object.assign({},e),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new ti(this.apiKey,s,n)}}var tr=S("ilpIi"),tl=S("gEjZb"),td=S("8zRAg");let tc=null,tu=null,th=null;async function tf(){try{let t=await (0,tr.getDoc)((0,tr.doc)(tl.db,"apikey","googlegenai"));t.exists()?(tc=t.data().key,th=new ta(tc).getGenerativeModel({model:"gemini-1.5-flash"})):console.error("error")}catch(t){console.error("Error fetching API Key:",t)}}async function tg(t){try{th||console.error("AI not initialized.");let e=t.toLowerCase();if(e.startsWith("add expense"))return await tE(e);if(e.startsWith("set budget"))return await tp(e);return(await th.generateContent(t)).response.text()||"I'm not sure about that. Try asking something else."}catch(t){console.error("Error fetching AI:",t)}}async function tE(t){try{let e=t.match(/add expense (\d+(\.\d{1,2})?) for (.+) in (.+)/);if(!e)return"Invalid format! Use: 'Add expense [amount] for [item] in [category]'";let n=parseFloat(e[1]),s=e[3].trim(),o=e[4].trim();return await (0,tr.addDoc)((0,tr.collection)(tl.db,"expenses"),{title:s,amount:n,category:o,createdAt:new Date().toISOString()}),(0,td.fetchExpenses)(),(0,td.fetchTotalExpenses)(),`Expense added: ${s} - $${n} in ${o}`}catch(t){return console.error("Error adding expense:",t),"Failed to add expense. Try again."}}async function tp(t){try{let e=t.match(/set budget (\d+(\.\d{1,2})?)/);if(!e)return"Invalid format! Use: 'Set budget [amount]'";let n=parseFloat(e[1]),s=(0,tr.doc)(tl.db,"budget","current");return await (0,tr.updateDoc)(s,{totalBudget:n}),(0,td.fetchBudget)(),`Budget set to $${n}`}catch(t){return console.error("Error setting budget:",t),"Failed to set budget. Try again."}}document.addEventListener("DOMContentLoaded",async function(){await tf(),(0,tr.onSnapshot)((0,tr.collection)(tl.db,"expenses"),t=>{var e;let n,s=[];t.forEach(t=>s.push(t.data())),e=s,(n=document.getElementById("expense-table"))&&(n.innerHTML="",e.forEach(t=>{let e=document.createElement("tr");e.innerHTML=`
            <td>${t.title}</td>
            <td>${t.category}</td>
            <td>$${t.amount.toFixed(2)}</td>
            <td>${new Date(t.createdAt).toLocaleDateString()}</td>
        `,n.appendChild(e)}))}),(0,tr.onSnapshot)((0,tr.doc)(tl.db,"settings","budget"),t=>{var e;let n;t.exists()&&(e=t.data().totalBudget,(n=document.getElementById("monthly-spending"))&&(n.textContent=`$${e.toFixed(2)}`))});let t=document.getElementById("chatbot-container"),e=document.getElementById("chat-history"),n=document.getElementById("chat-input"),s=document.getElementById("send-btn"),o=document.getElementById("hide-chatbot"),i=document.getElementById("show-chatbot");async function a(){let t=n.value.trim();""!==t&&(r("You",t),n.value="",r("Bot",await tg(t)))}function r(t,n){let s=document.createElement("div");s.innerHTML=`<strong>${t}:</strong> ${n}`,e.appendChild(s),e.scrollTop=e.scrollHeight}s.addEventListener("click",a),n.addEventListener("keypress",function(t){"Enter"===t.key&&a()}),o.addEventListener("click",function(){t.style.display="none",i.style.display="block"}),i.addEventListener("click",function(){t.style.display="block",i.style.display="none"})});
//# sourceMappingURL=index.38a125b2.js.map
