import { createI18n } from "vue-i18n";

const messages = {
    en: {

        common: {
            add: "Add",
            cancel: "Cancel",
            edit: "Edit",
            del: "Delete",
            fill: "Please fill this field.",
            fixErrors: "Fix form errors above.",
            logout: "Logout",
            name: "Name",
            save: "Save"
        },

        inverters: {
            title: "Inverters",
            noInverters: "Plant should have at least one inverter.",
            serial: "Serial number",
            shadow: "Shadow"
        },

        plants: {
            title: "Plants",
            address: "Address",
            grid: "Grid connection",
            gridOptions: {
                "N": "not connected",
                "L": "low voltage",
                "M": "medium voltage",
                "H": "high voltage"
            },
            type: "ESS type",
            typeOptions: {
                "P": "PV input included",
                "C": "EV charge included",
                "S": "ESS storage"
            },
            tz: "Timezone"
        }
    }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages
})