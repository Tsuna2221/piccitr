import React, { Component } from 'react';
import { isMobile } from './Partials/varCheck'

class SearchButton extends Component {
    render() {
        window.onclick = ({target: { dataset: { target } }}) => {
            if(target !== "search"){
                if(this.state.inputEnabled === true && isMobile){
                    this.hideNSFWButton()
                }
                this.setState({inputEnabled: false})
            }
        }

        let { inputEnabled } = this.state

        return (
            <div className="search-container d-flex pos-fixed z-index-100 cw-fill pad-h-16">
                <form onSubmit={this.redirectTo}>
                    <input onChange={this.handleInput} placeholder='Search sub or user by using "user/<name>"' data-target="search" className={`search-input mar-r-10 pad-h-24 s-12 br-circle no-outline ${inputEnabled ? '' : 'inactive'}`} type="text" spellCheck="false"/>
                </form>

                <span 
                    data-target="search"
                    onClick={isMobile ? inputEnabled ? this.redirectTo : () => {
                        this.hideNSFWButton()
                        this.toggleInput()
                    } : inputEnabled ? this.redirectTo : this.toggleInput} 
                    className={`SearchButton mdi ${inputEnabled ? 'mdi-arrow-right' : 'mdi-magnify'} br-circle c-white cw-fit clickable sd-medium  ${isMobile ? 's-26 pad-14' : 's-22 pad-10'}`}>
                </span>
            </div>
        );
    }

    state = {
        inputEnabled: false,
        sub: ''
    }
    
    hideNSFWButton = () => document.querySelector('.NSFWButton').classList.toggle('hide')

    toggleInput = () => this.setState({inputEnabled: !this.state.inputEnabled})

    handleInput = ({target: { value }}) => this.setState({...this.state, sub: value})

    redirectTo = (e) => {
        e.preventDefault()
        let { sub } = this.state
        let { origin } = window

        if(sub !== ""){
            window.location.href = `${origin}?r=${sub}`
        }
    }

}
export default SearchButton;