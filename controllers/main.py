from odoo import http
from odoo.http import request
from werkzeug.urls import url_encode

class WhatsappInvoiceController(http.Controller):

    @http.route('/whatsapp_invoice/download/<string:order_name>', auth='public')
    def download_invoice(self, order_name):
        # 1. Busca la factura por el nombre del pedido
        order = request.env['pos.order'].sudo().search([('name', '=', order_name)], limit=1)
        if not order:
            return request.not_found()

        # 2. Obtén el archivo adjunto de la factura
        invoice = order.account_move
        attachment = invoice.message_main_attachment_id

        # 3. Genera un token de acceso temporal 
        access_token = request.env['ir.attachment'].generate_access_token(attachment.id)

        # 4. Redirige al usuario a la descarga con el token
        query_params = url_encode({'access_token': access_token})
        redirect_url = f'/web/content/{attachment.id}?{query_params}'
        return request.redirect(redirect_url)