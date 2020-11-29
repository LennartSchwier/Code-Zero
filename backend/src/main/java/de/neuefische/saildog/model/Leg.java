package de.neuefische.saildog.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Leg {

    private String legId;
    private Waypoint startPoint;
    private Waypoint endPoint;
    private double course;
    private double distance;
}
