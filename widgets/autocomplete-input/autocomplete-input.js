class AutoCompleteInput extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    /* Start - Getter methods for the props we are subscribed to */
    get inputId() {
        return this.getAttribute("inputId");
    }

    get label() {
        return this.getAttribute("label");
    }
    get suggestionList() {
        return this.getAttribute("suggestionList");
    }
    /* End - Getter methods for the props we are subscribed to */

    /* Method to identify which all props of custom element to observe */
    static get observedAttributes() {
        return ["inputId", "label", "suggestionList"]
    }

    /* Method to call a function on change of props */
    attributeChangedCallback(prop) {
        if(prop === 'inputId' || prop === 'label' || prop === 'suggestionList') {
            this.renderAndUpdateDom();
        }
    }

    /* Method to call a function when our custom element is connected */
    connectedCallback() {
        this.renderAndUpdateDom();
    }

    /* Method to render our shadow element as well as make any dom changes if required */
    renderAndUpdateDom() {
        this.render();
        let suggestionListAsArray = JSON.parse(this.suggestionList);
        this.datalistOptions = suggestionListAsArray.map(
            (suggestion) => {
                return (
                    `<option value=${suggestion}>${suggestion}</option>`
                );
            }
        );
    }
    /* Method to render our shadow element */
    render() {
        this.shadow.innerHTML = `
            <style>
                .autocomplete-container {
                    margin: 10px 0px;
                    padding: 5px 0px;
                }
                .autocomplete-label, autocomplete-input {
                    display: block;
                    margin: 5px 0px;
                }
                .autocomplete-input {
                    padding: .375rem .75rem;
                    width: 30%;
                    outline: none;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: #495057;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }
            </style>
        
            <div class="autocomplete-container">    
                <label for="wizards" class="autocomplete-label">${this.label}</label>
                <input type="text" class="autocomplete-input" id=${this.inputId} name=${this.inputId} list="${this.inputId}List">
                <datalist class="autocomplete-datalist" id=${this.inputId}List>
                    ${this.datalistOptions}
                </datalist>
            </div>
        `;
    }
}

customElements.define('autocomplete-input', AutoCompleteInput);
