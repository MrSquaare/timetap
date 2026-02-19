import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import { Platform } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import { create } from "zustand";

export const DEFAULT_PORTAL_HOST = "__default_portal_host__";

type PortalMap = Map<string, ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

type PortalStore = {
  map: PortalHostMap;
  update: (hostName: string, name: string, children: ReactNode) => void;
  remove: (hostName: string, name: string) => void;
};

const usePortal = create<PortalStore>((set) => ({
  map: new Map<string, PortalMap>().set(DEFAULT_PORTAL_HOST, new Map()),
  update: (hostName, name, children) =>
    set((prev) => {
      const next = new Map(prev.map);
      const portal = new Map(
        next.get(hostName) ?? new Map<string, ReactNode>(),
      );

      portal.set(name, children);
      next.set(hostName, portal);

      return { map: next };
    }),
  remove: (hostName, name) =>
    set((prev) => {
      const next = new Map(prev.map);
      const portal = new Map(
        next.get(hostName) ?? new Map<string, ReactNode>(),
      );

      portal.delete(name);
      next.set(hostName, portal);

      return { map: next };
    }),
}));

export type PortalHostProps = {
  name?: string;
};

export const PortalHost: FC<PortalHostProps> = ({
  name = DEFAULT_PORTAL_HOST,
}) => {
  const portalMap = usePortal((state) => state.map.get(name));

  if (!portalMap || !portalMap.size) return null;

  const portalContent = Array.from(portalMap.values());

  if (Platform.OS === "ios") {
    return (
      <>
        <FullWindowOverlay>{portalContent}</FullWindowOverlay>
      </>
    );
  }

  return <>{portalContent}</>;
};

export type PortalProps = PropsWithChildren<{
  name: string;
  hostName?: string;
}>;

export const Portal: FC<PortalProps> = ({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}) => {
  const { update, remove } = usePortal();

  useEffect(() => {
    update(hostName, name, children);
  }, [update, hostName, name, children]);

  useEffect(() => {
    return () => {
      remove(hostName, name);
    };
  }, [remove, hostName, name]);

  return null;
};
