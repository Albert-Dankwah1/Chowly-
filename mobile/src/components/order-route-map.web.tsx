import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

import type { Order } from "@/lib/api";

export function OrderRouteMap({ order }: { order: Order }) {
  const [primary] = useCSSVariable(["--color-primary"]);

  return (
    <View className="mx-5 flex-1 items-center justify-center gap-3 rounded-card bg-muted/60 p-6 border border-border">
      <View
        className="size-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${primary as string}20` }}
      >
        <Ionicons color={primary as string} name="navigate-outline" size={32} />
      </View>

      <Text className="text-center font-heading text-body text-foreground font-semibold">
        Live Delivery Route
      </Text>

      <View className="w-full max-w-sm gap-2 rounded-lg bg-background/80 p-3">
        <View className="flex-row items-center gap-2">
          <Ionicons color={primary as string} name="restaurant-outline" size={16} />
          <Text className="font-sans text-xs text-foreground font-medium" numberOfLines={1}>
            {order.restaurantName}
          </Text>
        </View>

        <View className="ml-2 h-4 border-l border-dashed border-muted-foreground/40" />

        <View className="flex-row items-center gap-2">
          <Ionicons color="#10B981" name="location-outline" size={16} />
          <Text className="font-sans text-xs text-muted-foreground" numberOfLines={1}>
            {order.deliveryAddress.line1}, {order.deliveryAddress.city}
          </Text>
        </View>
      </View>

      <Text className="text-center font-sans text-xs text-muted-foreground">
        Interactive Google Map view is optimized for the native iOS and Android apps.
      </Text>
    </View>
  );
}
