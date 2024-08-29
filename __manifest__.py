{
    'name': 'Enviar Factura por WhatsApp',
    'version': '1.0',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_assets.xml',
        'views/pos_config_views.xml', 
    ],
    'assets': {
        'point_of_sale.assets': [
            'whatsapp_pos_invoice/static/src/js/pos_whatsapp.js',
        ],
    },
}