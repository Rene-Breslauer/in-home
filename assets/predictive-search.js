class PredictiveSearch extends HTMLElement{constructor(){super()}connectedCallback(){this.form=this.querySelector("form"),this.clear_button=this.querySelector(".search--clear"),this.input=this.querySelector(".search--textbox"),this.results=this.querySelector(".search--results"),this.cached_results={"":this.results.innerHTML},this.listenForKeyEntered(),this.formSubmit(),this.clearButtonListener(),this.addMutationObserver()}listenForKeyEntered(){this.input.on("input",()=>{var t=this.input.value.trim();this.clear_button.style.display=""===t?"none":"flex",this.getSearchResults(t)})}async getSearchResults(t){this.abort_controller&&this.abort_controller.abort();var e=t.handleize();if(this.cached_results[e])this.results.innerHTML=this.cached_results[e];else{this.abort_controller=new AbortController,this.toggleLoading(!0);try{var r=await fetch(`${theme.urls.predictive_search}?q=${encodeURIComponent(t)}&section_id=predictive-search`,{signal:this.abort_controller.signal});if(!r.ok)throw new Error(r.status);var s=await r.text(),i=theme.utils.parseHtml(s).innerHTML;this.cached_results[e]=i,this.results.innerHTML=i}catch{}}}clearButtonListener(){this.clear_button.on("click keydown",t=>{"keydown"===t.type&&"Enter"!==t.key||(t.preventDefault(),this.input.value="",this.input.focus(),this.input.trigger("input"))})}toggleLoading(t){setTimeout(()=>this.setAttribute("data-loading",t),t?0:100)}formSubmit(){this.form.on("submit",t=>{t.preventDefault(),window.location.href=theme.urls.search+"?type=product&q="+encodeURIComponent(this.input.value.trim())})}addMutationObserver(){new MutationObserver(()=>{this.toggleLoading(!1),window.trigger("theme:search:reloaded"),theme.settings.transitions&&theme.transitions.reload("search")}).observe(this.results,{childList:!0})}}customElements.define("predictive-search-root",PredictiveSearch);