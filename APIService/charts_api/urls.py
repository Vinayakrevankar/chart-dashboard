from django.urls import path
from .views import CandlestickData, LineChartData, BarChartData, PieChartData

urlpatterns = [
    path('api/candlestick-data/', CandlestickData.as_view(), name='candlestick-data'),
    path('api/line-chart-data/', LineChartData.as_view(), name='line-chart-data'),
    path('api/bar-chart-data/', BarChartData.as_view(), name='bar-chart-data'),
    path('api/pie-chart-data/', PieChartData.as_view(), name='pie-chart-data'),
]
