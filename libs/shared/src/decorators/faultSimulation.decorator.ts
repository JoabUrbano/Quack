import { Fault } from '@app/shared/faults/fault';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// export const FAULT_SIMULATION_METADATA_KEY = 'FAULT_SIMULATION_METADATA_KEY';

// export const FaultSimulation = (fault: Fault) => SetMetadata(FAULT_SIMULATION_METADATA_KEY, fault);

export const FaultSimulation = Reflector.createDecorator<Fault>();