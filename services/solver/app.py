import math
from collections import defaultdict
from time import sleep
from typing import Tuple

import streamlit as st
import time
import io
import csv

from rpds import List

PEOPLE_PER_ROOM = 5


class Hotel:
    def __init__(self, id, name, available_rooms):
        self.id = id
        self.name = name
        self.available_rooms = available_rooms


class Region:
    def __init__(self, name, population):
        self.name = name
        self.population = population
        self.rooms_needed = math.ceil(population / PEOPLE_PER_ROOM)


class CSP:
    def __init__(self, regions, hotels):
        self.regions = regions
        self.hotels = hotels
        self.assignments = {}

    def solve(self):
        for region in self.regions:
            self.assignments[region.name] = []
            people_left = region.population
            for hotel in self.hotels:
                if people_left > 0 and hotel.available_rooms > 0:
                    assigned = min(people_left, hotel.available_rooms)
                    self.assignments[region.name].append((hotel.name, assigned))
                    people_left -= assigned
                    hotel.available_rooms -= assigned
        return self.assignments


def load_regions(file):
    regions = []
    content = file.getvalue().decode('utf-8')
    csv_reader = csv.reader(io.StringIO(content))
    next(csv_reader)  # Skip header
    for row in csv_reader:
        if len(row) >= 2:
            name = row[0]
            population = int(row[1])
            regions.append(Region(name, population))

    # sort regions by population
    regions.sort(key=lambda x: x.population)
    return regions


def load_hotels(file):
    hotels = []
    content = file.getvalue().decode('utf-8')
    csv_reader = csv.reader(io.StringIO(content))
    next(csv_reader)  # Skip header
    for row in csv_reader:
        if len(row) >= 3:
            id = row[0]
            name = row[1]
            rooms = int(row[2])
            hotels.append(Hotel(id, name, rooms))
    return hotels


def get_first_hotel_with_rooms(rooms_left_map):
    for hotel_id, rooms_left in rooms_left_map.items():
        if rooms_left > 0:
            return hotel_id


def run_algorithm(regions, hotels):
    start_time = time.time()
    hotels_map = {hotel.id: hotel for hotel in hotels}
    regions_map = {region.name: region for region in regions}

    allocation_map = defaultdict(lambda: defaultdict(int))
    rooms_left_map = {}
    # init rooms_left_map
    for hotel in hotels:
        rooms_left_map[hotel.id] = hotel.available_rooms
    allocations_csv = []
    for region in regions:
        st.write(f"Looking for rooms for '{region.name}'")
        with st.spinner(f"מחשב..."):
            sleep(0.5)
        rooms_needed = region.rooms_needed
        while rooms_needed > 0:
            hotel_id = get_first_hotel_with_rooms(rooms_left_map)
            if hotel_id is None:
                st.write(f"No hotels with rooms available for '{region.name}'")
                break
            hotel = hotels_map[hotel_id]
            rooms_left = rooms_left_map[hotel_id]
            if rooms_left > 0:
                rooms_left -= 1
                rooms_needed -= 1
                rooms_left_map[hotel_id] = rooms_left
                allocation_map[region.name][hotel.name] += 1
        allocations = allocation_map[region.name]
        st.table([
            {
                "hotel": hotel_name,
                "Rooms Assigned": allocations[hotel_name]
            }
            for hotel_name in allocations.keys()
        ])
        for hotel_name in allocations.keys():
            allocations_csv.append((region.name, hotel_name, allocations[hotel_name]))

    # print allocations_csv

    st.table([
        {
            "region": region,
            "hotel": hotel,
            "rooms": rooms
        }
        for region, hotel, rooms in allocations_csv
    ])
    end_time = time.time()
    return {
        "time": end_time - start_time
    }


def reverse_hebrew(text):
    if isinstance(text, str):
        return text[::-1]
    return text


st.title("Hotel Room Assignment Dashboard")
st.sidebar.header("Configuration")
regions_file = st.sidebar.file_uploader("Upload Regions CSV", type="csv")
hotels_file = st.sidebar.file_uploader("Upload Hotels CSV", type="csv")

if regions_file and hotels_file:
    try:
        st.header("אזורים לפינוי")
        regions = load_regions(regions_file)
        st.table([
            {
                "Region": region.name,
                "Population": region.population,
                "Rooms Needed": region.rooms_needed
            }
            for region in regions
        ])

        st.header("יעדיי פינוי")
        hotels = load_hotels(hotels_file)
        st.table([
            {
                "Hotel": hotel.name,
                "Rooms": hotel.available_rooms
            }
            for hotel in hotels
        ])

        if not regions:
            st.error("No valid data found in the Regions CSV. Please check the file format.")
        elif not hotels:
            st.error("No valid data found in the Hotels CSV. Please check the file format.")
        else:
            if st.sidebar.button("Run Algorithm"):
                with st.spinner("Running Algorithm..."):
                    result = run_algorithm(regions, hotels)

                st.success("הרצה הסתיימה בהצלחה!")


    except Exception as e:
        st.error(f"An error occurred while processing the files: {str(e)}")
else:
    st.info("Please upload both the Regions and Hotels CSV files to proceed.")
