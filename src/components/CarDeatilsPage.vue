<template>
  <Navbar />
  <div class="mt-20 max-w-6xl mx-auto px-4 py-10">
    <div
      class="relative mx-auto w-full md:w-4/5 h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg bg-gray-900"
    >
      <img
        :src="photos[currentIndex]"
        class="w-full h-full object-cover transition-all duration-500"
      />

      <button
        @click="prev"
        class="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md z-20"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        @click="next"
        class="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md z-20"
        aria-label="Next image"
      >
        ›
      </button>

      <!-- Thumbnails Row -->
      <div class="absolute bottom-3 w-full flex justify-center gap-2 z-20">
        <img
          v-for="(p, i) in photos"
          :key="i"
          :src="p"
          @click="currentIndex = i"
          :class="[
            'w-12 h-10 object-cover rounded-md border cursor-pointer transition-transform duration-200',
            i === currentIndex
              ? 'border-white scale-105 shadow-md'
              : 'border-transparent opacity-70 hover:scale-105',
          ]"
          :alt="`thumb-${i}`"
        />
      </div>
    </div>

    <!-- MAIN CONTENT + STICKY SIDEBAR -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- MAIN (2 cols on lg) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title + badges -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 fade-up"
        >
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900">
              {{ car.name }}
            </h1>
            <p class="text-gray-500 mt-1">
              {{ car.year }} • {{ car.brand }} • {{ car.model }}
            </p>

            <div class="mt-3 flex items-center gap-3">
              <span
                class="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                {{ car.kms_driven }} km
              </span>

              <span
                class="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                ⛽ {{ car.fuel_type }}
              </span>

              <span
                class="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                ⚙️ {{ car.transmission }}
              </span>
            </div>
          </div>

          <!-- price inline (small on top for mobile) -->
          <div class="md:text-right">
            <p class="text-2xl md:text-3xl font-extrabold text-rose-600">
              ₹ {{ formattedPrice }}
            </p>
            <p class="text-sm text-gray-500 mt-1">Expected on-road price</p>
          </div>
        </div>

        <!-- Highlights Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 fade-up">
          <div
            class="p-4 bg-white rounded-xl shadow-sm flex flex-col items-start gap-1 transform transition hover:-translate-y-1"
          >
            <svg class="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div class="text-xs text-gray-500">Mileage</div>
            <div class="font-semibold">{{ car.mileage }} km/l</div>
          </div>

          <div
            class="p-4 bg-white rounded-xl shadow-sm flex flex-col items-start gap-1 transform transition hover:-translate-y-1"
          >
            <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div class="text-xs text-gray-500">Engine</div>
            <div class="font-semibold">{{ car.engine_cc }} cc</div>
          </div>

          <div
            class="p-4 bg-white rounded-xl shadow-sm flex flex-col items-start gap-1 transform transition hover:-translate-y-1"
          >
            <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div class="text-xs text-gray-500">Power</div>
            <div class="font-semibold">{{ car.power_bhp }} bhp</div>
          </div>

          <div
            class="p-4 bg-white rounded-xl shadow-sm flex flex-col items-start gap-1 transform transition hover:-translate-y-1"
          >
            <svg
              class="w-6 h-6 text-yellow-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 4v16"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div class="text-xs text-gray-500">Torque</div>
            <div class="font-semibold">{{ car.torque_nm }} Nm</div>
          </div>
        </div>

        <!-- Features / Safety / Comfort grouped with subtle animation -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-5 rounded-xl shadow fade-up">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5 text-amber-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M5 12h14" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Features
            </h3>
            <div class="grid gap-2">
              <div
                v-for="(f, i) in car.features"
                :key="i"
                class="text-sm text-gray-700 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-rose-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 13l4 4L20 6"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ f }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl shadow fade-up">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 2v20" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Safety
            </h3>
            <div class="grid gap-2">
              <div
                v-for="(f, i) in car.safety_features"
                :key="i"
                class="text-sm text-gray-700 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5l4 4-8 8"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ f }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl shadow fade-up">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M3 12h18" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Comfort
            </h3>
            <div class="grid gap-2">
              <div
                v-for="(f, i) in car.comfort_features"
                :key="i"
                class="text-sm text-gray-700 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l4 4 10-10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ f }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Service history -->
        <div class="bg-white p-5 rounded-xl shadow fade-up">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20" stroke="currentColor" stroke-width="1.5" />
            </svg>
            Service History
          </h3>

          <div
            v-if="
              Array.isArray(car.service_history) && car.service_history.length
            "
            class="space-y-3"
          >
            <div
              v-for="(s, idx) in car.service_history"
              :key="idx"
              class="p-3 bg-gray-50 rounded-lg"
            >
              <div class="text-sm font-medium">
                {{ s.type || s.title || s.service || "Service" }}
              </div>
              <div class="text-xs text-gray-500">
                {{ s.date || s.on || "" }} • {{ s.km ? s.km + " km" : "" }}
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-gray-700">
            {{ car.service_history || "No detailed service history available" }}
          </div>
        </div>
      </div>

      <!-- STICKY SIDEBAR -->
      <aside class="lg:col-span-1">
        <div class="sticky top-6 space-y-4">
          <div
            class="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 animate-pop"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-gray-500">Price</div>
                <div class="text-2xl font-extrabold text-rose-600">
                  ₹ {{ formattedPrice }}
                </div>
              </div>

              <div class="text-right">
                <div class="text-xs text-gray-500">On-road est.</div>
                <div class="text-sm font-medium">₹ {{ formattedOnRoad }}</div>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M12 2v20" stroke="currentColor" stroke-width="1.5" />
                </svg>
                <div>Insurance</div>
              </div>
              <div class="text-right">₹ {{ insuranceAmount }}</div>

              <div class="flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M3 12h18" stroke="currentColor" stroke-width="1.5" />
                </svg>
                <div>Registration</div>
              </div>
              <div class="text-right">₹ {{ registrationAmount }}</div>
            </div>

            <div class="mt-4">
              <button
                class="w-full bg-rose-600 hover:bg-rose-700 py-3 rounded-xl font-semibold shadow"
                @click="router.push(`/cars/${carId}/dealer-contact`)"
              >
                Contact Dealer
              </button>
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm text-sm">
            <div class="font-semibold mb-2">Loan estimate</div>
            <div class="text-gray-700">
              Down payment (10%): ₹ {{ downPayment }}
            </div>
            <div class="text-gray-700 mt-1">
              EMI (5 yrs, 9% p.a): ₹ {{ monthlyEMI }}
            </div>
            <div class="text-xs text-gray-500 mt-2">
              This is an estimate. Actual EMI depends on lender, interest &
              tenure.
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl shadow-sm text-xs text-gray-600"
          >
            <strong>Inspection:</strong> Clean title • 200+ point check •
            Warranty options available
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./navbar.vue";
import router from "../router";

const route = useRoute();
const carId = route.params.id || 1;
const token = localStorage.getItem("jwt_token");
if (!token) router.push("/login"); // ensure token is loaded
const car = ref({
  features: [],
  safety_features: [],
  comfort_features: [],
  infotainment_features: [],
  service_history: [],
});
const photos = ref([]);
const currentIndex = ref(0);

const toArray = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  // try JSON
  try {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === "object" && parsed !== null) return parsed;
  } catch {}
  if (String(v).includes(",")) {
    return String(v)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return String(v)
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean);
};

// robust parse for potential JSON objects
const toObject = (v) => {
  if (!v) return {};
  if (typeof v === "object") return v;
  try {
    const parsed = JSON.parse(v);
    if (typeof parsed === "object") return parsed;
  } catch {}
  return v;
};

onMounted(async () => {
  const res = await fetch(`https://dreamwheelsproject.onrender.com/cars/${carId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
    },
  });
  const data = await res.json();
  try {
    const p = data.photos;
    if (Array.isArray(p)) photos.value = p;
    else {
      const parsed = JSON.parse(p);
      photos.value = Array.isArray(parsed) ? parsed : toArray(p);
    }
  } catch {
    photos.value = toArray(data.photos);
  }

  car.value = {
    ...data,
    features: toArray(data.features),
    safety_features: toArray(data.safety_features),
    comfort_features: toArray(data.comfort_features),
    infotainment_features: toArray(data.infotainment_features),
    exterior_features: toArray(data.exterior_features),
    interior_features: toArray(data.interior_features),
    service_history: (() => {
      const raw = data.service_history;
      if (!raw) return [];
      if (Array.isArray(raw)) return raw;
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed; // valid structured list
        if (typeof parsed === "object") return [parsed];
      } catch {}
      if (typeof raw === "string" && raw.length > 80) {
        return [{ title: raw.trim(), note: "Summary" }];
      }
      if (String(raw).includes("\n")) {
        return String(raw)
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean)
          .map((line) => ({ title: line }));
      }
      return [{ title: String(raw).trim() }];
    })(),
    tyre_condition: toObject(data.tyre_condition),
    battery_health: toObject(data.battery_health),
  };

  if (!Array.isArray(car.value.features)) car.value.features = [];
  if (!Array.isArray(car.value.safety_features)) car.value.safety_features = [];
  if (!Array.isArray(car.value.comfort_features))
    car.value.comfort_features = [];
  if (!Array.isArray(car.value.infotainment_features))
    car.value.infotainment_features = [];
  if (!Array.isArray(car.value.service_history)) car.value.service_history = [];
});

const next = () => {
  if (!photos.value.length) return;
  currentIndex.value = (currentIndex.value + 1) % photos.value.length;
};

const prev = () => {
  if (!photos.value.length) return;
  currentIndex.value =
    (currentIndex.value - 1 + photos.value.length) % photos.value.length;
};

const formattedPrice = computed(() => {
  const p = Number(car.value.price) || 0;
  return new Intl.NumberFormat("en-IN").format(p);
});

const insurancePercent = 0.03; // example 3%
const registrationPercent = 0.015; // 1.5%
const handlingPercent = 0.005; // 0.5%

const insuranceAmount = computed(() =>
  Math.round((Number(car.value.price) || 0) * insurancePercent)
);
const registrationAmount = computed(() =>
  Math.round((Number(car.value.price) || 0) * registrationPercent)
);
const handlingAmount = computed(() =>
  Math.round((Number(car.value.price) || 0) * handlingPercent)
);

const formattedOnRoad = computed(() => {
  const p = Number(car.value.price) || 0;
  const onRoad = Math.round(
    p + insuranceAmount.value + registrationAmount.value + handlingAmount.value
  );
  return new Intl.NumberFormat("en-IN").format(onRoad);
});

// simple loan estimate (10% down, 9% annual interest default, 5 years)
const downPayment = computed(() =>
  Math.round((Number(car.value.price) || 0) * 0.1)
);
const monthlyEMI = computed(() => {
  const P = Math.max(0, (Number(car.value.price) || 0) - downPayment.value);
  const annualRate = 0.09;
  const r = annualRate / 12; // monthly rate
  const n = 5 * 12; // 5 years
  if (P === 0) return 0;
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
});
</script>

<style scoped>
/* micro animations */
.fade-up {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp 520ms ease forwards;
  animation-delay: 120ms;
}
.fade-up {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp 520ms ease forwards;
  animation-delay: 120ms;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* subtle pop for sticky card */
@keyframes pop {
  0% {
    transform: translateY(6px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-pop {
  animation: pop 360ms ease;
}

/* make sure slider buttons are accessible */
button[aria-label] {
  line-height: 1;
}

/* responsive tweaks */
@media (min-width: 1024px) {
  .md\:h-96 {
    height: 26rem;
  }
}
</style>
