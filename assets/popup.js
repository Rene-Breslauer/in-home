class Popup extends HTMLElement{static instances=[];static parent=document.querySelector(".popup--root");static options={size:parseInt(Popup.parent.getAttribute("data-size")),limit:"true"===Popup.parent.getAttribute("data-limit"),consent_tracking:"true"===Popup.parent.getAttribute("data-consent-tracking")};constructor(){super()}connectedCallback(){Popup.instances.unshift(this),this.container=this.querySelector(".popup--block--container"),this.close_link=this.querySelector(".popup--block--close"),this.delay=parseInt(1e3*this.getAttribute("data-delay")),this.form=this.querySelector("form"),this.referrer_enabled="true"===this.getAttribute("data-referrer-enabled"),this.referrer_url=this.getAttribute("data-referrer-url"),this.show_again_after=parseInt(this.getAttribute("data-show-again-after")),this.show_at_bottom="true"===this.getAttribute("data-show-at-bottom");var t=document.body.getAttribute("data-theme-name").toLowerCase(),e=this.getAttribute("data-block-id");this.id=t+"Theme:popup:"+e,this.eventListeners(),Popup.options.consent_tracking||Popup.options.size!==Popup.instances.length||Popup.loadNext()}load(){(!this.referrer_enabled||document.referrer.includes(this.referrer_url))&&(void 0===localStorage[this.id]||this.readyToReset())?(this.setResetTime(),this.startTimer()):Popup.loadNext()}startTimer(){Popup.options.limit&&(Popup.instances=[]),this.timer=setTimeout(()=>this.open(),this.delay),this.show_at_bottom&&this.addObserver()}addObserver(){var t=document.querySelector(".layout--footer-group");t&&(this.observer=new IntersectionObserver(([{isIntersecting:t}],e)=>{t&&(this.open(),clearTimeout(this.timer),e.disconnect())},{threshold:.1}),this.observer.observe(t))}eventListeners(){this.form&&this.form.on("submit",()=>this.form.setAttribute("aria-busy",!0)),this.close_link.on("click",()=>{this.close(),this.observer&&this.observer.disconnect(),Popup.loadNext()}),Shopify.designMode&&(this.on("theme:block:deselect",()=>this.close()),this.on("theme:block:select",()=>{this.off("transitionend"),this.open()}))}open(){this.setAttribute("aria-hidden",!1),setTimeout(()=>this.setAttribute("data-transition-active",!0),5)}close(){this.setAttribute("data-transition-active",!1),this.on("transitionend",()=>this.setAttribute("aria-hidden",!0),{once:!0})}readyToReset(){var t=JSON.parse(localStorage[this.id]).expires,e=(new Date).getTime();return parseFloat(t-e)<=0&&(this.setResetTime(),!0)}setResetTime(){var t=new Date,e=864e5*this.show_again_after,s=t.setTime(t.getTime()+e);localStorage[this.id]=JSON.stringify({expires:s})}static loadNext(){0!=Popup.instances.length&&Popup.instances.pop().load()}}theme.popup=Popup,customElements.define("popup-block",Popup);