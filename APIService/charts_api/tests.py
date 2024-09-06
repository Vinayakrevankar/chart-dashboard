from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status 
from django.urls import reverse

class ChartAPITests(TestCase):
    def setUp(self):
        # Initialize the API client
        self.client = APIClient()

    def test_candlestick_data(self):
        # Define the API endpoint URL
        url = reverse('candlestick-data')

        # Make a GET request to the API
        response = self.client.get(url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the response contains the expected data structure
        expected_data = {
            "data": [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
            ]
        }
        self.assertEqual(response.json(), expected_data)

    def test_line_chart_data(self):
        # Define the API endpoint URL
        url = reverse('line-chart-data')

        # Make a GET request to the API
        response = self.client.get(url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the response contains the expected data structure
        expected_data = {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "data": [10, 20, 30, 40]
        }
        self.assertEqual(response.json(), expected_data)

    def test_bar_chart_data(self):
        # Define the API endpoint URL
        url = reverse('bar-chart-data')

        # Make a GET request to the API
        response = self.client.get(url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the response contains the expected data structure
        expected_data = {
            "labels": ["Product A", "Product B", "Product C"],
            "data": [100, 150, 200]
        }
        self.assertEqual(response.json(), expected_data)

    def test_pie_chart_data(self):
        # Define the API endpoint URL
        url = reverse('pie-chart-data')

        # Make a GET request to the API
        response = self.client.get(url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the response contains the expected data structure
        expected_data = {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        }
        self.assertEqual(response.json(), expected_data)
