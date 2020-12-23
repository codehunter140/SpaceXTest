
import axios from 'axios';
const url = 'https://api.spacexdata.com/v4/launches/upcoming'; 
describe("GET / ", () => {
    test("The given fields should exist in API response", async () => {
      const response = await axios.get(url);

      expect(response.status).toBe(200);

      let data = response.data;
      expect(data.length).toBeGreaterThan(0);

      expect(data[0].name).toBeDefined();
      expect(data[0].date_utc).toBeDefined();
      expect(data[0].flight_number).toBeDefined();
      expect(data[0].launchpad).toBeDefined();
      expect(data[0].id).toBeDefined();
      expect(data[0].upcoming).toBeDefined();
      
    });
  });