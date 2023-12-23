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

        BESS: {
            title: "BESS",
            U: "Voltage",
            A: "Power",
            Pnom: "Nominal output power capacity",
            Uw0: "Working min voltage",
            Uw1: "Working max voltage",
            Uc: "Charging max voltage"
        },

        inverters: {
            title: "Inverters",
            noInverters: "Plant should have at least one inverter.",
            Pout: "Output power",
            shadow: "Shadow",
            Udc0: "DC min voltage",
            Udc1: "DC max voltage",
            Umppt0: "MPPT min voltage",
            Umppt1: "MPPT max voltage",
            Uac: "AC voltage",
        },

        plants: {
            title: "Plants",
            address: "Address",
            gridT: "Grid connection",
            gridTOptions: {
                "N": "not connected",
                "L": "low voltage",
                "M": "medium voltage",
                "H": "high voltage"
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