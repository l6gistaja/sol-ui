<template>
<div :class="'alert alert-'+data.type+' wuilert'" role="alert" v-if="data.text != ''">
  <span v-html="data.text"></span>
  <button type="button" class="close" data-dismiss="alert" v-if="data.ttl == 0" @click="hide()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
</template>

<script>

export default {
    props: ['msg'],
    
    data() {
        return {
            data: {},
            templates: {
                err: { text: 'An error occurred.' },
                errUpdCfg: { text: 'Error updating configuration.' },
                updCfg: {
                    text: 'Configuration updated successfully! To activate the changes, go to <a href="#/system/">System</a> and click <strong>Restart Application</strong>.',
                    type: 'success', 
                    ttl: 0 
                }
            },
            intervalMsg: ''
        }
    },

    created() {
        this.data = this.getDefaults();
    },
    
    watch: { 
        msg: function(newVal, oldVal) {
            const data = this.getDefaults();
            data.origMsg = newVal;
            const message = JSON.parse(newVal);
            if(!('tpl' in message) && !('txt' in message)) {
                message.tpl = 'err';
            }
            if('tpl' in message && message.tpl in this.templates) {
                const tpl = JSON.parse(JSON.stringify(this.templates[message.tpl]));
                for(var t in tpl) {
                    data[t] = tpl[t];
                }
            }
            if('ttl' in message && message.ttl > -1) {
                data.ttl = message.ttl;
            }
            var msgFields = ['text','type'];
            for(var i in msgFields) {
                if(msgFields[i] in message) {
                    data[msgFields[i]] = message[msgFields[i]];
                }
            }
            this.data = data;
            console.log(data);
            if(data.ttl != 0 && data.text != '') {
                this.intervalMsg = newVal;
                setTimeout(this.chkBeforeHide, parseInt(data.ttl));
            }
        }
    },
    
    methods: {

        chkBeforeHide() { if(this.data.origMsg == this.intervalMsg) { this.hide(); } },

        hide() { this.data.text = ''; },

        getDefaults() {
            return {
                // text inside Wuilert; if empty, Wuilert will be hidden
                text: '',
                // one of the Bootstrap's alert styles
                type: 'danger',
                // how many milliseconds Wuilert will be shown;
                // if < 0, default value will be used
                // if 0, Wuilert can be closed manually
                ttl: 3000
            }
        }
    }
}

</script>

<style scoped>

.wuilert {
    margin: 6px;
}

.close {

    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem 1.25rem;
    color: inherit;

    background-color: transparent;
    border: 0;
    -webkit-appearance: none;

    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    
}

</style>
