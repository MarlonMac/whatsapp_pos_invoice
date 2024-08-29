odoo.define('whatsapp_invoice.pos_whatsapp', function(require) {
    "use strict";

    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    class WhatsappButton extends PosComponent {
        constructor() {
            super(...arguments);
        }

        async sendWhatsapp() {
            // 1. Obtén la factura actual
            const order = this.env.pos.get_order();
            if (!order) return;

            // 2. Genera el enlace de descarga de la factura (usa el controlador)
            const invoiceUrl = await this.rpc({
                model: 'ir.attachment',
                method: 'get_whatsapp_invoice_url',
                args: [order.get_name()],
            });

            // 3. Obtén la plantilla del mensaje (desde la configuración del POS)
            const messageTemplate = this.env.pos.config.whatsapp_message_template || "Aquí está tu factura: ";

            // 4. Construye el mensaje completo
            const message = messageTemplate + invoiceUrl;

            // 5. Obtén el número de teléfono del cliente
            const phoneNumber = order.get_client().mobile; 

            // 6. Codifica el mensaje para la URL
            const encodedMessage = encodeURIComponent(message);

            // 7. Construye el enlace "clic para chatear"
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // 8. Abre el enlace en una nueva ventana o pestaña
            window.open(whatsappLink, '_blank');
        }
    }

    WhatsappButton.template = 'whatsapp_invoice.WhatsappButton';

    Registries.Component.add(WhatsappButton);

    return WhatsappButton;
});