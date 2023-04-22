interface MemoryInterface {
  memTotal: string | undefined;
  memFree: string | undefined;
  memUsage: number | undefined;
  memUse: string | undefined;
  jvmMemUse: number | undefined;
}
interface CPUInfoInterface {
  cpuUsage: number | undefined;
  cpuWaitPer: string | undefined;
  cpuSysUsage: string | undefined;
  cpuUserUsage: string | undefined;
}
interface SystemInfoInterface {
  HostName: string | undefined;
  HostAddress: string | undefined;
  cpuName: string | undefined;
  cpuCoreCount: string | undefined;
  systemName: string | undefined;
  systemType: string | undefined;
  totalMemory: string | undefined;
  javaVersion: string | undefined;
}
export {MemoryInterface}
export {CPUInfoInterface}
export {SystemInfoInterface}

