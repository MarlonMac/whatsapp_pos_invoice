from odoo import models, fields

class PosConfig(models.Model):
    _inherit = 'pos.config'

    whatsapp_message_template = fields.Text(string="Plantilla de Mensaje de WhatsApp")