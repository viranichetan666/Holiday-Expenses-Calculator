import axios from 'axios';

const payoutsPayload = {
	"expenses": [
		{ "name": "Adriana", "amount": 5.75 },
		{ "name": "Adriana", "amount": 5.75 },
		{ "name": "Bao", "amount": 12 }
	]
}

const payoutsResponse = {
  "data": {
      "total": 23.5,
      "equalShare": 11.75,
      "payouts": [
          {
              "owes": "Adriana",
              "owed": "Bao",
              "amount": 0.25
          }
      ]
  },
  "message": "success"
}

describe('Post /api/payouts', () => {
  it('should return a response', async () => {
    const res = await axios.post(`http://localhost:3000/api/payouts`, payoutsPayload);
    expect(res.status).toBe(200);
    expect(res.data).toEqual(payoutsResponse);
  });

  it('should return a error', async () => {
    try {
      await axios.post(`http://localhost:3000/api/payouts`, {});
    } catch (err) {
      expect(err.response.status).toBe(500);
      expect(err.code).toBe("ERR_BAD_RESPONSE");
    }
  });
});
